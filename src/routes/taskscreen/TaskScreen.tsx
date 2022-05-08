import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import parser from 'bbcode-to-react';
import CommentsList from '../../components/comments/CommentsList';
import { BoardDto, getAllBoards, getAllBoardsWithSort, getBoardByTask, getTaskById, moveTask, TaskDto } from '../../data';
import { RelativeTime } from '../../utils/RelativeTime';
import './taskscreen.css';
import ChangeBoardButton from '../../components/changeboardbutton/ChangeBoardButton';

const TaskScreen: React.FC = () => {
  const [inWork, setInWork] = useState(localStorage.getItem('inwork') === 'true')
  const [taskData, setTaskData] = useState<ModalDto>();

  const [membersField, setMembersField] = useState('');

  const [task, setTask] = useState(getTaskById(Number(useParams().taskId)) as TaskDto);
  const [board, setBoard] = useState(getBoardByTask(task) as BoardDto);

  const isNew = RelativeTime.inMinutes(task.creationDate) < 60 * 24;

  useEffect(() => {

  }, []);

  return (
    <div className="container-fluid h-100 " >
      <Modal onApprove={(dto) => {
        localStorage.setItem('inwork', 'true');
        localStorage.setItem('taskdata', JSON.stringify(dto));
        setTaskData(dto);
        setInWork(true);
      }

      } />
      <div>
        <div className="d-flex flex-wrap">
          <nav className="py-2 px-3 rounded-2 mt-3 me-0 me-sm-3" aria-label="breadcrumb" style={{ background: '#E9ECEF' }}>
            <ol className="breadcrumb m-0">
              <li className="breadcrumb-item text-secondary brdlink">Проекты</li>
              <li className="breadcrumb-item text-secondary brdlink">Городское управление</li>
              <li className="breadcrumb-item text-secondary brdlink">
                <Link to='/dashboard' style={{
                  color: 'black'
                }}>
                  Цифровой двойник города
                </Link>
              </li>
              <li className="breadcrumb-item active  text-primary" aria-current="page">{task.title}</li>
            </ol>
          </nav>
        </div>

        <div className="row">
          <div className='col-xl-8 col-lg-7 col-md-7'>
            <div className='p-3'>
              <h2>{task.title} {isNew && <span className="badge bg-primary ms-4 fs-5">Новое</span>}</h2>
              <p>{task.description}</p>
              <div className='d-flex gap-4 flex-wrap text-secondary'>
                Добавлено {RelativeTime.fromNowOn(task.creationDate).toLowerCase()}, в {RelativeTime.displayTime(task.creationDate)}
                <p className='position-relative'>
                  <>
                    <span className={`p-1 rounded-circle badge d-inline-block bg-${board.alterColor}`}></span>
                    <span className='ms-2 ' >{board.title}</span>
                  </>
                </p>
              </div>
              <div className='d-flex gap-2'>
                {getAllBoardsWithSort().filter(b => !b.newBoard).map(b => {
                  return (
                    <ChangeBoardButton
                      onClick={(t, b) => {
                        moveTask(t, b);
                        setTask(t);
                        setBoard(b);
                      }}
                      key={b.id}
                      current={board.id === b.id}
                      board={b}
                      task={task}
                    />
                  )
                })}
              </div>
            </div>
            <hr />
            <div className='p-3 fs-5'>
              {parser.toReact(task.legend)}
            </div>
            <hr />
            <CommentsList taskId={task.id} />
          </div>
          {taskData &&
            <div className='col'>
              <div className="p-4 m-3 mt-4 border rounded bg-white">
                <div className='row mb-3'>
                  <div className="col text-secondary">Приоритет: </div>
                  <div className="col">{taskData.rate}</div>
                </div>
                <div className='row mb-3' >
                  <div className="col text-secondary">Ответств.:</div>
                  <div className="col">{taskData.resp}</div>
                </div>
                <div className='row flex-wrap' >
                  <div className="col text-secondary">Участники:</div>
                  <div className="col">
                    <ul className='list-group list-group-flush'>
                      {taskData.memb.map(i => <li className='list-group-item ps-0'>
                        {i}
                      </li>)}
                    </ul>
                    <a href='#' className='link ps-0' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => {
                      setMembersField(taskData.memb.join(', '));
                    }}>изменить</a>
                    <div className="modal fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Изменить участников</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            <input type="text" className="form-control" placeholder="Участники, через запятую" value={membersField} onChange={e => setMembersField(e.target.value)} />
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => {
                              const dto: ModalDto = { ...taskData, memb: membersField.split(',').map(i => i.trim()) };
                              setTaskData(dto);
                              localStorage.setItem('taskdata', JSON.stringify(dto));
                            }}>Сохранить</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      <div className="spacer"></div>
    </div>
  );
};

type ModalDto = {
  rate: string;
  resp: string;
  memb: string[];
}

type ModalProps = {
  onApprove: (dto: ModalDto) => void;
}

const Modal: React.FC<ModalProps> = ({ onApprove }) => {
  const [rate, setRate] = useState('none');
  const [resp, setResp] = useState('Максим Песков');
  const [memb, setMemb] = useState('');

  return (
    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Детали задачи</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form className="form">
              <div className="form-floating mb-3">
                <select value={rate} onChange={e => setRate(e.target.value)} id='floatingInput' className="form-select" aria-label="Default select example">
                  <option value="none" disabled className='text-secondary'>Выберите из списка</option>
                  <option value="Низкий">Низкий</option>
                  <option value="Обычный" className='text-info'>Обычный</option>
                  <option value="Высокий" className='text-danger'>Высокий</option>
                </select>
                <label htmlFor="floatingInput">Приоритет</label>
              </div>

              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Ответственный</label>
                <input value={resp} onChange={e => setResp(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Ответственный" />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Участники</label>
                <input value={memb} onChange={e => setMemb(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Участники, через запятую" />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
            <button type="button" className="btn btn-primary" onClick={() => {
              onApprove({
                rate, resp, memb: memb.split(',').map(i => i.trim())
              });
              setRate('none');
              setResp('Максим Песков');
              setMemb('');
            }} data-bs-dismiss="modal">Подтвердить</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskScreen;
