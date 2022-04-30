export type BoardDto = {
  id: number;
  order: number;
  title: string;
  color: string;
  tasks: TaskDto[];
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
    color: '#57bbf3',
    tasks: [
      {
        id: 1,
        boardId: 1,
        title: 'Провести опрос',
        description: 'В связи с модернизацией парка автомобилей общественного транспорта.',
        legend: 'text',
        creationDate: '2022-04-30T13:28:31.803Z'
      }
    ]
  },
  {
    id: 2,
    order: 2,
    title: 'В работе',
    color: '#4dcdae',
    tasks: [

    ]
  },
  {
    id: 3,
    order: 3,
    title: 'Нужна информация',
    color: '#f2c85f',
    tasks: [

    ]
  },
  {
    id: 4,
    order: 4,
    title: 'Выполнено',
    color: '#aaaaaa',
    tasks: [

    ]
  },
]

export const getAllBoards = () => {
  return boards;
}
