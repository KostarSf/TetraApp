import React, { useState } from 'react';
import DataActions from '../../utils/data/DataActions';
import { BoardDto, TaskDto, WorkTaskDto, WorkTaskPriority } from '../../utils/data/Types';
import useUniqueId from '../../utils/UniqueID';
import WorkTaskForm from '../worktaskform/WorkTaskForm';
import Modal from './Modal';

export type WorkTaskModalData = {
  task: TaskDto;
  board: BoardDto;
};

export type WorkTaskModalProps = {
  show: boolean;
  data: WorkTaskModalData | undefined;
  onClose: VoidFunction;
  onSave: (workTask: WorkTaskDto, task: TaskDto, board: BoardDto) => void;
}

const WorkTaskModal: React.FC<WorkTaskModalProps> = ({
  show,
  data,
  onClose,
  onSave,
}) => {
  const [id] = useState(useUniqueId('WorkTaskModal-'))

  const [workTask, setWorkTask] = useState<WorkTaskDto>(getBlankWorkTask());

  const onCloseHandle = () => {
    setWorkTask(getBlankWorkTask());
    onClose();
  }

  const setId = (name: string) => {
    return `${name}_${id}`
  }

  const onSaveHandle = () => {
    if (!data) return;

    const newWorkTask = {
      ...workTask,
      taskId: data.task.id
    }

    onSave(newWorkTask, data.task, data.board);
  }

  return (
    <Modal
      show={show}
      closeOnSave
      onClose={onCloseHandle}
      onSave={onSaveHandle}
      header={{
        title: 'Провести опрос'
      }}
      footer={{
        closeButtonText: 'Отмена',
        saveButtonText: 'Обновить задачу'
      }}
    >
      <WorkTaskForm
        value={workTask}
        onChange={wt => setWorkTask(wt)}
      />
    </Modal>
  );
};

const getBlankWorkTask = (): WorkTaskDto => {
  const currentDay = new Date();

  const getNextDay = () => {
    let nextDay = new Date(currentDay);
    nextDay.setDate(currentDay.getDate() + 1);
    return nextDay;
  }

  return {
    priority: WorkTaskPriority.normal,
    status: 'Подготовка к выполнению',
    taskId: -1,
    managerId: DataActions.getCurrentUser().id,
    memberIds: [],
    startDate: currentDay.toISOString(),
    finishDate: getNextDay().toISOString()
  }
}

export default WorkTaskModal;
