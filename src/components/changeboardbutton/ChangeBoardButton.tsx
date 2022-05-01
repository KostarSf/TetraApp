import React from 'react';
import { BoardDto, TaskDto } from '../../data';

type ChangeBoardButtonProps = {
  current: boolean,
  board: BoardDto,
  task: TaskDto,
  onClick: (task: TaskDto, board: BoardDto) => void,
}

const ChangeBoardButton: React.FC<ChangeBoardButtonProps> = ({
  current,
  board,
  task,
  onClick
}) => {
  const btnStyle = `btn${!current ? '-outline' : ''}-${board.alterColor}`;

  return (
    <button
      onClick={() => onClick(task, board)}
      className={'btn ' + btnStyle}
      disabled={current}
    >
      { current ? board.title : board.actionName}
    </button>
  );
};

export default ChangeBoardButton;
