import TempStore from "./TempStore";
import { BoardDto, CommentDto, TaskDto, UserDto, WorkTaskDto } from "./Types";

export default class DataActions {
  static getTasksOfBoard = (boardId: number) => {
    return TempStore.GetTasks().filter((t) => t.boardId === boardId);
  }

  static getAllBoards = () => {
    return TempStore.GetBoards().map(b => ({ ...b, tasks: this.getTasksOfBoard(b.id) }))
  }

  static getAllBoardsWithSort = () => {
    return this.getAllBoards().sort((a, b) => a.order - b.order);
  }

  static getTaskById = (taskId: number) => {
    return TempStore.GetTasks().find(t => t.id === taskId);
  }

  static getBoardByTask = (task: TaskDto) => {
    return this.getAllBoards().find(b => b.id === task.boardId);
  }

  static getUsers = () => {
    return TempStore.GetUsers();
  }

  static getUserById = (userId: number) => {
    return TempStore.GetUsers().find(u => u.id === userId);
  }

  static getAllComments = () => {
    return TempStore.GetComments().map(c => ({ ...c, user: this.getUserById(c.userId) }));
  }

  static getCommentsByTaskId = (taskId: number): CommentDto[] => {
    return this.getAllComments().filter(c => c.taskId === taskId);
  }

  static getCommentById = (id: number): CommentDto | undefined => {
    return this.getAllComments().find(c => c.id === id);
  }

  static createComment = (text: string, taskId: number, userId: number, parentCommentId: number | undefined = undefined) => {
    return TempStore.AddComment({
      id: 0,
      taskId,
      userId,
      text,
      parentCommentId,
      timestamp: Date.now()
    });
  }

  static getCurrentUser = () => this.getUserById(1) as UserDto;

  static moveTask = (task: TaskDto, board: BoardDto) => {
    const newTasks = TempStore.GetTasks().map(t => {
      if (t.id !== task.id) return t;
      return { ...t, boardId: board.id };
    })
    TempStore.SetTasks(newTasks);
  }

  static getWorkTasks = () => {
    return TempStore.GetWorkTasks();
  }

  static getWorkTaskById = (taskId: number) => {
    return this.getWorkTasks().find(t => t.taskId === taskId);
  }

  static setWorkTask = (workTask: WorkTaskDto) => {
    TempStore.SetWorkTask(workTask);
  }
}
