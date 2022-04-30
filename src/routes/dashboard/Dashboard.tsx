import Card from "../../components/card/Card";
import CardList from "../../components/cardlist/CardList";
import './dashboard.css';
import addTaskImg from './addTask.svg';
import { useEffect, useState } from "react";
import { BoardDto, getAllBoards } from "../../data";

type Props = {
}

const Dashboard: React.FC<Props> = ({  }) => {
  const [boards, setBoards] = useState<BoardDto[]>([]);

  useEffect(() => setBoards(getAllBoards()), [])

  return (
    <div className="container-fluid h-100" >
      <div className="d-flex flex-wrap">
        <nav className="py-2 px-3 rounded-2 mt-3 me-0 me-sm-3" aria-label="breadcrumb" style={{ background: '#E9ECEF' }}>
          <ol className="breadcrumb m-0">
            <li className="breadcrumb-item text-secondary">Проекты</li>
            <li className="breadcrumb-item text-secondary">Городское управление</li>
            <li className="breadcrumb-item active  text-primary" aria-current="page">Цифровой двойник города</li>
          </ol>
        </nav>
        <button className="px-3 btn text-primary mt-3" style={{ background: 'white' }} type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel-fill me-2" viewBox="0 0 16 16">
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z" />
          </svg>
          Добавить фильтры
        </button>
      </div>

      <div className="listswrapper row">
        {boards.map(board => (
          <CardList title={board.title} color={board.color} key={board.id}>
            {board.tasks && board.tasks.map(task => (
              <Card task={task} key={task.id}/>
            ))}
          </CardList>
        ))}
        <button className="addTaskBtn  col-xxl-2 col-xl-3 col-lg-4 col-md-5">
          <img src={addTaskImg} alt="" />
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
