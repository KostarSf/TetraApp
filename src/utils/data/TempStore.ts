import { BoardDto, CommentDto, TaskDto, UserDto, WorkTaskDto, WorkTaskPriority } from "./Types"

export default class TempStore {
  private static boards: BoardDto[] = [
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

  static GetBoards = () => this.boards;

  static SetBoards = (boards: BoardDto[]) => {
    this.boards = boards;
  }

  private static tasks: TaskDto[] = [
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

  static GetTasks = () => this.tasks;

  static SetTasks = (tasks: TaskDto[]) => {
    this.tasks = tasks;
  }

  private static users: UserDto[] = [
    {
      id: 1,
      fullName: 'Максим Песков',
    },
    {
      id: 2,
      fullName: 'Андрей Захарченко'
    },
    {
      id: 3,
      fullName: 'Даниил Куприев'
    },
    {
      id: 4,
      fullName: 'Михаил Кортунов'
    }
  ]

  static GetUsers = () => this.users;

  static SetUsers = (users: UserDto[]) => {
    this.users = users;
  }

  private static lastCommentId = 1

  private static comments: CommentDto[] = [
    {
      id: 1,
      taskId: 1,
      userId: 2,
      text: 'Мы подготовим команду тестирования',
      timestamp: 1651572429000
    }
  ]

  static GetComments = () => this.comments;

  static AddComment = (comment: CommentDto) => {
    const newComment: CommentDto = {
      id: ++this.lastCommentId,
      taskId: comment.taskId,
      userId: comment.userId,
      text: comment.text,
      parentCommentId: comment.parentCommentId,
      timestamp: comment.timestamp
    }
    this.comments.push(newComment);
    return newComment;
  }

  private static workTasks: WorkTaskDto[] = [
    {
      taskId: 1,
      priority: WorkTaskPriority.normal,
      managerId: 1,
      memberIds: [2],
      status: 'start',
      startDate: '2022-05-09T13:27:33.285Z',
      finishDate: '2022-15-09T13:27:33.285Z'
    }
  ]

  static GetWorkTasks = () => this.workTasks;

  static SetWorkTask = (workTask: WorkTaskDto) => {
    const oldWorkTask = this.workTasks.find(t => t.taskId === workTask.taskId);

    if (oldWorkTask) {
      this.workTasks = this.workTasks.map(t => {
        return t.taskId === workTask.taskId ?
          {...workTask} : t
      })
    } else {
      this.workTasks.push(workTask);
    }
  }
}
