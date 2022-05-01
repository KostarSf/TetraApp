export type BoardDto = {
  id: number;
  order: number;
  title: string;
  actionName: string;
  color: string;
  alterColor: string;
  workBoard?: boolean;
  newBoard?: boolean;
  tasks?: TaskDto[];
}

export type TaskDto = {
  id: number,
  boardId: number,
  title: string,
  description: string,
  legend: string,
  creationDate: string
}

let boards: BoardDto[] = [
  {
    id: 1,
    order: 1,
    title: 'Новые задачи',
    actionName: 'Новые задачи',
    color: '#57bbf3',
    alterColor: 'primary',
    newBoard: true,
    tasks: [
      {
        id: 1,
        boardId: 1,
        title: 'Провести опрос',
        description: 'В связи с модернизацией парка автомобилей общественного транспорта.',
        legend: '[p]В связи с недавней модернизацией парка автомобилей общественного транспорта требуется провести социальный опрос, чтобы выявить потенциальные скрытые проблемы и недоработки. [/p] [p]Соответствующий персонал будет выделен из волонтерских подразделений, также будет произведена помощь с набором контрольных групп.[/p]',
        creationDate: '2022-04-30T13:38:06.857Z'
      }
    ]
  },
  {
    id: 2,
    order: 3,
    title: 'В работе',
    actionName: 'Взять в работу',
    color: '#4dcdae',
    alterColor: 'success',
    workBoard: true,
  },
  {
    id: 3,
    order: 2,
    title: 'Нужна информация',
    actionName: 'Нужна информация',
    color: '#f2c85f',
    alterColor: 'warning',
    tasks: [
      {
        id: 2,
        boardId: 3,
        title: 'Модернизировать транспорт',
        description: 'Обновить парк автомобилей, оборудовать терминалами бесконтактной оплаты более 90% общественного транспорта города.',
        legend: 'text',
        creationDate: '2022-04-28T14:08:06.857Z'
      }
    ]
  },
  {
    id: 4,
    order: 4,
    title: 'Закрыто',
    actionName: 'Закрыть задачу',
    color: '#aaaaaa',
    alterColor: 'secondary',
  },
]

export const getAllBoards = () => {
  return boards;
}

export const getAllBoardsWithSort = () => {
  return boards.sort((a, b) => a.order - b.order);
}

export const getTaskById = (id: number) => {
  for (let i = 0; i < boards.length; i++) {
    for (let j = 0; j < (boards[i].tasks?.length || 0); j++) {
      let task = boards[i].tasks![j];
      if (task.id === id) return task;
    }
  }
}

export const getBoardByTask = (task: TaskDto) =>{
  return boards.find(b => b.id === task.boardId);
}

export const moveTask = (task: TaskDto, board: BoardDto) => {
  //TODO Rewrite this part due to creating dublicates
  const newBoard = boards.find(b => b.id === board.id) as BoardDto;
  if (!newBoard.tasks) {
    newBoard.tasks = [{ ...task, boardId: board.id }]
  } else {
    newBoard.tasks.push({ ...task, boardId: board.id });
  }
  const oldBoard = boards.find(b => b.id === task.boardId) as BoardDto;
  oldBoard.tasks = oldBoard.tasks?.filter(t => t.id !== task.id);
}
