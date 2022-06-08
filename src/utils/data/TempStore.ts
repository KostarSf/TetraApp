import { BoardDto, CommentDto, TaskDto, UserDto, WorkTaskDto, WorkTaskPriority } from "./Types"

export default class TempStore {
  private static boards: BoardDto[] = [
    {
      id: 1,
      order: 1,
      title: "Новые задачи",
      actionName: "Новые задачи",
      color: "#57bbf3",
      alterColor: "primary",
      newBoard: true,
    },
    {
      id: 2,
      order: 3,
      title: "В работе",
      actionName: "Взять в работу",
      color: "#4dcdae",
      alterColor: "success",
      workBoard: true,
    },
    {
      id: 3,
      order: 2,
      title: "Нужна информация",
      actionName: "Нужна информация",
      color: "#f2c85f",
      alterColor: "warning",
    },
    {
      id: 4,
      order: 4,
      title: "Закрыто",
      actionName: "Закрыть задачу",
      color: "#aaaaaa",
      alterColor: "secondary",
    },
  ];

  static GetBoards = () => this.boards;

  static SetBoards = (boards: BoardDto[]) => {
    this.boards = boards;
  };

  private static tasks: TaskDto[] = [
    {
      id: 1,
      boardId: 1,
      title: "Провести собрание",
      description: "В связи с модернизацией автомобильного транспортного парка",
      legend:
        "[p]В связи с недавней модернизацией автомобильного транспортного парка требуется провести собрание управляющего состава, чтобы выявить потенциальные скрытые проблемы и недоработки. [/p] [p]Соответствующий персонал будет выделен из подразделения, также будет произведена помощь с набором контрольных групп.[/p]",
      creationDate: "2022-06-07T13:38:06.857Z",
    },
    {
      id: 2,
      boardId: 3,
      title: "Модернизировать транспорт",
      description:
        "Обновить автомобильный транспортный парк, оборудовать аппаратами спутниковой связи свыше 90% рабочего транспорта компании.",
      legend:
        "Обновить автомобильный транспортный парк, оборудовать аппаратами спутниковой связи свыше 90% рабочего транспорта компании.",
      creationDate: "2022-06-06T14:08:06.857Z",
    },
    {
      id: 3,
      boardId: 3,
      title: "Плановый осмотр",
      description:
        "Провести технический осмотр транспорта, относящегося к классу изотермических фургонов .",
      legend:
        "Провести технический осмотр транспорта, относящегося к классу изотермических фургонов .",
      creationDate: "2022-06-04T11:08:06.857Z",
    },
  ];

  static GetTasks = () => this.tasks;

  static SetTasks = (tasks: TaskDto[]) => {
    this.tasks = tasks;
  };

  private static users: UserDto[] = [
    {
      id: 1,
      fullName: "Песков Андрей Игоревич",
    },
    {
      id: 2,
      fullName: "Андреев Владимир Владимирович",
    },
    {
      id: 3,
      fullName: "Заротиади Андрей Игоревич",
    },
    {
      id: 4,
      fullName: "Захаров Ерефан Генадиевич",
    },
  ];

  static GetUsers = () => this.users;

  static SetUsers = (users: UserDto[]) => {
    this.users = users;
  };

  private static lastCommentId = 1;

  private static comments: CommentDto[] = [
    {
      id: 1,
      taskId: 1,
      userId: 2,
      text: "Мы подготовим команду тестирования",
      timestamp: 1654629040952,
    },
  ];

  static GetComments = () => this.comments;

  static AddComment = (comment: CommentDto) => {
    const newComment: CommentDto = {
      id: ++this.lastCommentId,
      taskId: comment.taskId,
      userId: comment.userId,
      text: comment.text,
      parentCommentId: comment.parentCommentId,
      timestamp: comment.timestamp,
    };
    this.comments.push(newComment);
    return newComment;
  };

  private static workTasks: WorkTaskDto[] = [
    {
      taskId: 1,
      priority: WorkTaskPriority.normal,
      managerId: 1,
      memberIds: [2],
      status: "start",
      startDate: "2022-05-09T13:27:33.285Z",
      finishDate: "2022-15-09T13:27:33.285Z",
    },
  ];

  static GetWorkTasks = () => this.workTasks;

  static SetWorkTask = (workTask: WorkTaskDto) => {
    const oldWorkTask = this.workTasks.find(
      (t) => t.taskId === workTask.taskId
    );

    if (oldWorkTask) {
      this.workTasks = this.workTasks.map((t) => {
        return t.taskId === workTask.taskId ? { ...workTask } : t;
      });
    } else {
      this.workTasks.push(workTask);
    }
  };
}
