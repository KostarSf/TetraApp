import React, { useState } from 'react';
import { BoardDto, TaskDto, WorkTaskDto, WorkTaskPriority } from '../../utils/data/Types';
import useUniqueId from '../../utils/UniqueID';
import Modal from './Modal';

export type WorkTaskModalData = {
  task: TaskDto;
  board: BoardDto;
};

export type WorkTaskModalProps = {
  show: boolean;
  data: WorkTaskModalData | undefined;
  onClose: VoidFunction;
  onSave: (workTask: WorkTaskDto | any) => void;
}

const WorkTaskModal: React.FC<WorkTaskModalProps> = ({
  show,
  data,
  onClose,
  onSave,
}) => {
  const [id] = useState(useUniqueId('WorkTaskModal-'))

  const [priority, setPriority] = useState<WorkTaskPriority>(WorkTaskPriority.normal);
  const [status, setStatus] = useState('Подготовка к выполнению');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [finishDate, setFinishDate] = useState<Date>(() => {
    let nextDay = new Date(startDate);
    nextDay.setDate(startDate.getDate() + 1);
    return nextDay;
  })

  const setId = (name: string) => {
    return `${name}_${id}`
  }

  const onSaveHandle = () => {
    onSave({})
  }

  return (
    <Modal
      show={show}
      closeOnSave
      onClose={onClose}
      onSave={onSaveHandle}
      header={{
        title: 'Провести опрос'
      }}
      footer={{
        closeButtonText: 'Отмена',
        saveButtonText: 'Взять в работу'
      }}
    >
      <div className="mb-3">
        <label htmlFor={setId('priority')} className="form-label">Приоритет</label>
        <select
          className="form-select"
          id={setId('priority')}
          aria-label="Приоритет"
          defaultValue='2'
        >
          <option value="1">Низкий</option>
          <option value="2">Обычный</option>
          <option value="3">Высокий</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor={setId('manager')} className="form-label">Менеджер</label>
        <select
          className="form-select"
          id={setId('manager')}
          aria-label="Менеджер"
          defaultValue='1'
        >
          <option value="1">Максим Песков</option>
          <option value="2">Кто-то Ещё</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor={setId('members')} className="form-label">Исполнители</label>
        <input type="text" className="form-control" id={setId('members')} placeholder="Список исполнителей" />
      </div>
      <div className="mb-3">
        <label htmlFor={setId('status')} className="form-label">Статус</label>
        <input
          type="text"
          className="form-control"
          id={setId('status')}
          placeholder="Статус задачи"
          value={status}
          onChange={e => setStatus(e.target.value)}
        />
      </div>
      <div className="mb-3 row">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <label htmlFor={setId('startDate')} className="form-label">Дата начала</label>
          <input
            type="datetime-local"
            className="form-control"
            id={setId('startDate')}
            value={getLocalTimeValue(startDate)}
            onChange={e => setStartDate(getUtcTimeFromLocal(e.target.value)) }
          />
        </div>
        <div className="col-sm-6">
          <label htmlFor={setId('endDate')} className="form-label">Дата завершения</label>
          <input
            type="datetime-local"
            className="form-control"
            id={setId('endDate')}
            value={getLocalTimeValue(finishDate)}
            onChange={e => setFinishDate(getUtcTimeFromLocal(e.target.value))}
          />
        </div>
      </div>
    </Modal>
  );
};

const getLocalTimeValue = (date: Date): string => {
  const now = new Date(date);
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

const getUtcTimeFromLocal = (date: string): Date => {
  const now = new Date(date);
  console.log(now);
  return now;
}

export default WorkTaskModal;
