import Card from "../card/Card";
import CardList from "../cardlist/CardList";
import './dashboard.css';
import addTaskImg from './addTask.svg';

const Dashboard = () => {
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

      <div className="d-flex">
        <div className="d-flex flex-wrap gap-3">
          <CardList title="Новые задачи" color="#57BBF3">
            <Card
              title="Card title"
              description="Some quick example text to build on the card title and make up the bulk of the card's content."
              isNew={true}
              date="2 дня"
              onClick={() => { }}
            />
          </CardList>
          <CardList title="В работе" color="#DF0303">
            <Card
              title="Card title"
              description="Some quick example text to build on the card title and make up the bulk of the card's content."
              isNew={false}
              date="2 дня"
              onClick={() => { }}
            />
          </CardList>
          <CardList title="Сбор обратной связи" color="#F2C85F">

          </CardList>
          <CardList title="Выполнено" color="#4DCDAE">

          </CardList>
        </div>
        <button className="addTaskBtn">
          <img src={addTaskImg} alt="" />
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
