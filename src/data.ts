export type BoardDto = {
  id: number;
  order: number;
  title: string;
  color: string;
  workBoard: boolean;
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
    color: '#57bbf3',
    workBoard: false,
    tasks: [
      {
        id: 1,
        boardId: 1,
        title: 'Провести опрос',
        description: 'В связи с модернизацией парка автомобилей общественного транспорта.',
        legend: 'text',
        creationDate: '2022-04-30T13:38:06.857Z'
      }
    ]
  },
  {
    id: 2,
    order: 2,
    title: 'В работе',
    color: '#4dcdae',
    workBoard: true,
  },
  {
    id: 3,
    order: 3,
    title: 'Нужна информация',
    color: '#f2c85f',
    workBoard: false,
    tasks: [
      {
        id: 2,
        boardId: 3,
        title: 'Модернизировать транспорт',
        description: 'Обновить парк автомобилей, оборудовать терминалами бесконтактной оплаты более 90% общественного транспорта города.',
        legend: 'text',
        creationDate: '2022-04-28T13:38:06.857Z'
      }
    ]
  },
  {
    id: 4,
    order: 4,
    title: 'Выполнено',
    color: '#aaaaaa',
    workBoard: false,
  },
]

export const getAllBoards = () => {
  return boards;
}

export const getTaskById = (id: number) => {
  for (let i = 0; i < boards.length; i++) {
    for (let j = 0; j < (boards[i].tasks?.length || 0); j++) {
      let task = boards[i].tasks![j];
      if (task.id === id) return task;
    }
  }
}
