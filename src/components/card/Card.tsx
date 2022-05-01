import { Link } from 'react-router-dom';
import { TaskDto } from '../../data';
import { RelativeTime } from '../../utils/RelativeTime';
import st from './Card.module.css';
import React from 'react';

type Props = {
  task: TaskDto
}

const Card: React.FC<Props> = ({
  task,
}) => {
  const creationDateString = RelativeTime.fromNowOn(task.creationDate);
  const isNew = RelativeTime.inMinutes(task.creationDate) < 60 * 24;

  return (
    <div className={"card " + st.card} style={{ position: 'relative' }}>
      <div className="card-body">
        <h5 className="card-title">
          {task.title}
        </h5>

        <p className="card-text">{task.description}</p>
        <p className="text-primary fs-5 mb-0 d-flex justify-content-between align-items-end">
          <span>{creationDateString}</span>
          {isNew && <span className="badge bg-primary">Новое</span>}
        </p>
      </div>
      <Link to={`/task/${task.id}`} style={{position: 'absolute', inset: '0'}} />
    </div>
  );
}

export default Card;
