import React, { useEffect, useState } from 'react';
import Comments from '../comments/Comments';
import './taskscreen.css';

type Props = {
  onScreenChange: (screen: string) => void;
}

const TaskScreen: React.FC<Props> = ({ onScreenChange }) => {
  const [inWork, setInWork] = useState(localStorage.getItem('inwork') === 'true')
  const [taskData, setTaskData] = useState<ModalDto>();

  useEffect(() => {
    const data = localStorage.getItem('taskdata');
    if (data) {
      setTaskData(JSON.parse(data));
    }
  }, []);

  return (
    <div className="container-fluid h-100 " >
      <Modal onApprove={(dto) => {
        localStorage.setItem('inwork', 'true');
        localStorage.setItem('taskdata', JSON.stringify(dto));
        setTaskData(dto);
        setInWork(true);
      }

      }/>
      <div>
        <div className="d-flex flex-wrap">
          <nav className="py-2 px-3 rounded-2 mt-3 me-0 me-sm-3" aria-label="breadcrumb" style={{ background: '#E9ECEF' }}>
            <ol className="breadcrumb m-0">
              <li className="breadcrumb-item text-secondary brdlink">Проекты</li>
              <li className="breadcrumb-item text-secondary brdlink">Городское управление</li>
              <li className="breadcrumb-item text-secondary brdlink" onClick={() => {
                localStorage.setItem('screen', 'dashboard');
                onScreenChange('dashboard');
              }}>
                Цифровой двойник города
              </li>
              <li className="breadcrumb-item active  text-primary" aria-current="page">Провести опрос</li>
            </ol>
          </nav>
        </div>

        <div className="row">
          <div className='col-xl-8 col-lg-7 col-md-7'>
            <div className='p-3'>
              <h2>Провести опрос</h2>
              <p>В связи с модернизацией парка автомобилей общественного транспорта.</p>
              <div className='d-flex gap-4 flex-wrap text-secondary'>
                Добавлено сегодня, в 14:05
                <p className='position-relative'>
                  {!inWork ?
                    <>
                      <span className='p-1 rounded-circle badge bg-primary d-inline-block'></span>
                      <span className='ms-2'>Новая задача</span>
                    </>
                    :
                    <>
                      <span className='p-1 rounded-circle badge bg-danger d-inline-block'></span>
                      <span className='ms-2'>В работе</span>
                    </>
                  }
                </p>
              </div>
              <div className='d-flex gap-2'>
                {!inWork &&
                  <>
                    <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#exampleModal">
                      Взять в работу
                    </button>
                    <button className='btn btn-warning'>Нужна информация</button>
                  </>
                }
                {inWork &&
                  <button className='btn btn-outline-danger' onClick={() => {
                    localStorage.setItem('inwork', 'false');
                    localStorage.removeItem('taskdata');
                    setTaskData(undefined);
                    setInWork(false);
                  }}>В работе</button>
                }

              </div>
            </div>
            <hr />
            <div className='p-3'>
              <p className='fs-5'>В связи с недавней модернизацией парка автомобилей общественного транспорта требуется провести социальный опрос, чтобы выявить потенциальные скрытые проблемы и недоработки.</p>
              <p className='fs-5'>Соответствующий персонал будет выделен из волонтерских подразделений, также будет произведена помощь с набором контрольных групп.</p>
            </div>
            <hr />
            <Comments />
          </div>
          {taskData &&
            <div className='col'>
              <div className="p-4 m-3 mt-4 border rounded bg-white">
                <div className='row mb-3'>
                  <div className="col text-secondary">Приоритет: </div>
                  <div className="col">{taskData.rate}</div>
                </div>
                <div className='row mb-3' >
                  <div className="col text-secondary">Ответств.</div>
                  <div className="col">{taskData.resp}</div>
                </div>
                <div className='row flex-wrap' >
                  <div className="col text-secondary">Участники</div>
                  <div className="col">{taskData.memb}</div>
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
  memb: string;
}

type ModalProps = {
  onApprove: (dto: ModalDto) => void;
}

const Modal: React.FC<ModalProps> = ({onApprove}) => {
  const [rate, setRate] = useState('none');
  const [resp, setResp] = useState('');
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
                <input value={resp} onChange={e => setResp(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="ФИО Ответственного" />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Участники</label>
                <input value={memb} onChange={e => setMemb(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="ФИО Участников через запятую" />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
            <button type="button" className="btn btn-primary" onClick={() => {
              onApprove({
                rate, resp, memb
              });
              setRate('none');
              setResp('');
              setMemb('');
            }} data-bs-dismiss="modal">Подтвердить</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskScreen;
