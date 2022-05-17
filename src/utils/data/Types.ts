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

export enum WorkTaskPriority {
  low = 'Низкий',
  normal = 'Обычный',
  high = 'Высокий'
}

export type WorkTaskDto = {
  taskId: number,
  priority: WorkTaskPriority,
  managerId: number,
  memberIds: number[],
  status: string,
  startDate: string,
  finishDate: string,
}

export type UserDto = {
  id: number,
  fullName: string,
  avatarUrl?: string,
}

export type CommentDto = {
  id: number,
  taskId: number,
  parentCommentId?: number,
  userId: number,
  text: string,
  timestamp: number,
  user?: UserDto,
}
