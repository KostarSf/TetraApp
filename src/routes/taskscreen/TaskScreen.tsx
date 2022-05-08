import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import parser from 'bbcode-to-react';
import CommentsList from '../../components/comments/CommentsList';
import { RelativeTime } from '../../utils/RelativeTime';
import './taskscreen.css';
import ChangeBoardButton from '../../components/changeboardbutton/ChangeBoardButton';
import Fakecrumb from '../../components/fakecrumb/Fakecrumb';
import DataActions from '../../utils/data/DataActions';
import { BoardDto, TaskDto } from '../../utils/data/Types';

const TaskScreen: React.FC = () => {
  const [inWork, setInWork] = useState(localStorage.getItem('inwork') === 'true')
  const [taskData, setTaskData] = useState<ModalDto>();

  const [membersField, setMembersField] = useState('');

  const [task, setTask] = useState(DataActions.getTaskById(Number(useParams().taskId)) as TaskDto);
  const [board, setBoard] = useState(DataActions.getBoardByTask(task) as BoardDto);

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
      }} />
      <div>
        <Fakecrumb
          fakeItems={['Проекты', 'Городское управление']}
          items={[{ title: 'Цифровой двойник города', link: '/dashboard'}]}
          currentItem={task.title}
        />

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
                {DataActions.getAllBoardsWithSort().filter(b => !b.newBoard).map(b => {
                  return (
                    <ChangeBoardButton
                      onClick={(t, b) => {
                        DataActions.moveTask(t, b);
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
