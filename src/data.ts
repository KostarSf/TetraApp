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

let tasks: TaskDto[] = [
  {
    id: 1,
    boardId: 1,
    title: 'Провести опрос',
    description: 'В связи с модернизацией парка автомобилей общественного транспорта.',
    legend: '[p]В связи с недавней модернизацией парка автомобилей общественного транспорта требуется провести социальный опрос, чтобы выявить потенциальные скрытые проблемы и недоработки. [/p] [p]Соответствующий персонал будет выделен из волонтерских подразделений, также будет произведена помощь с набором контрольных групп.[/p]',
    creationDate: '2022-04-30T13:38:06.857Z'
  },
  {
    id: 2,
    boardId: 3,
    title: 'Модернизировать транспорт',
    description: 'Обновить парк автомобилей, оборудовать терминалами бесконтактной оплаты более 90% общественного транспорта города.',
    legend: 'text',
    creationDate: '2022-04-28T14:08:06.857Z'
  }
]

export const getTasksOfBoard = (boardId: number) => {
  return tasks.filter((t) => t.boardId === boardId);
}

export const getAllBoards = () => {
  return boards.map(b => ({...b, tasks: getTasksOfBoard(b.id)}))
}

export const getAllBoardsWithSort = () => {
  return getAllBoards().sort((a, b) => a.order - b.order);
}

export const getTaskById = (taskId: number) => {
  return tasks.find(t => t.id === taskId);
}

export const getBoardByTask = (task: TaskDto) =>{
  return boards.find(b => b.id === task.boardId);
}

export const moveTask = (task: TaskDto, board: BoardDto) => {
  tasks = tasks.map(t => {
    if (t.id !== task.id) return t;
    return {...t, boardId: board.id};
  })
}
