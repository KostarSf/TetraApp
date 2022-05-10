import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parser from 'bbcode-to-react';
import CommentsList from '../../components/comments/CommentsList';
import { RelativeTime } from '../../utils/RelativeTime';
import './taskscreen.css';
import ChangeBoardButton from '../../components/changeboardbutton/ChangeBoardButton';
import Fakecrumb from '../../components/fakecrumb/Fakecrumb';
import DataActions from '../../utils/data/DataActions';
import { BoardDto, TaskDto } from '../../utils/data/Types';
import WorkTaskModal, { WorkTaskModalData } from '../../components/modals/WorkTaskModal';

const TaskScreen: React.FC = () => {
  const [task, setTask] = useState(DataActions.getTaskById(Number(useParams().taskId)) as TaskDto);
  const [board, setBoard] = useState(DataActions.getBoardByTask(task) as BoardDto);
  const [showWorkDialog, setShowWorkDialog] = useState(false);
  const [workDialogData, setWorkDialogData] = useState<WorkTaskModalData>();

  const isNew = RelativeTime.inMinutes(task.creationDate) < 60 * 24;

  useEffect(() => {

  }, []);

  const moveTaskAction = (task: TaskDto, board: BoardDto) => {
    DataActions.moveTask(task, board);
    setTask(task);
    setBoard(board);
  }

  const moveTaskHandle = (task: TaskDto, board: BoardDto) => {
    if (!board.workBoard) {
      moveTaskAction(task, board);
    } else {
      setWorkDialogData({task, board});
      setShowWorkDialog(true);
    }
  }

  return (
    <div className="container-fluid h-100 ">
      <WorkTaskModal
        show={showWorkDialog}
        data={workDialogData}
        onClose={() => setShowWorkDialog(false)}
        onSave={(workTask) => {
          console.log('yes');
        }}
      />
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
                      onClick={moveTaskHandle}
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
          {board.workBoard &&
            <div className='col'>
              <div className="p-4 m-3 mt-4 border rounded bg-white">
                <div className='row mb-3'>
                  <div className="col text-secondary">Приоритет: </div>
                  <div className="col">taskData.rate</div>
                </div>
                <div className='row mb-3' >
                  <div className="col text-secondary">Ответств.:</div>
                  <div className="col">taskData.resp</div>
                </div>
                <div className='row flex-wrap' >
                  <div className="col text-secondary">Участники:</div>
                  <div className="col">
                    <ul className='list-group list-group-flush'>
                      {`taskData.memb.map(i => <li className='list-group-item ps-0'>
                        {i}
                      </li>)`}
                    </ul>
                    <button className='btn btn-link'>изменить</button>
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

export default TaskScreen;
