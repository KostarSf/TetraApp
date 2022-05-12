import React, { useEffect, useState } from 'react';
import DataActions from '../../utils/data/DataActions';
import { BoardDto, TaskDto, UserDto, WorkTaskDto, WorkTaskPriority } from '../../utils/data/Types';
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
  onSave: (workTask: WorkTaskDto, task: TaskDto, board: BoardDto) => void;
}

const WorkTaskModal: React.FC<WorkTaskModalProps> = ({
  show,
  data,
  onClose,
  onSave,
}) => {
  const [id] = useState(useUniqueId('WorkTaskModal-'))

  const [priority, setPriority] = useState <WorkTaskPriority>(WorkTaskPriority.normal);
  const [status, setStatus] = useState('Подготовка к выполнению');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [finishDate, setFinishDate] = useState<Date>(() => {
    let nextDay = new Date(startDate);
    nextDay.setDate(startDate.getDate() + 1);
    return nextDay;
  })

  const [users, setUsers] = useState<UserDto[]>([]);
  const [managerId, setManagerId] = useState<number>(DataActions.getCurrentUser().id);
  const [memberIds, setMemberIds] = useState<number[]>([]);

  useEffect(() => {
    const users = DataActions.getUsers();
    setUsers(users);
  })

  const setId = (name: string) => {
    return `${name}_${id}`
  }

  const onSaveHandle = () => {
    if (!data) return;

    onSave({
      taskId: data.task.id,
      priority,
      managerId,
      memberIds,
      status,
      startDate: startDate.toISOString(),
      finishDate: finishDate.toISOString()
    }, data.task, data.board);
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
          value={getEnumEntryByValue(priority, WorkTaskPriority)}
          onChange={e => setPriority(setEnumByEntry(e.target.value, WorkTaskPriority))}
        >
          {getEnumEntries(WorkTaskPriority).map(i => (
            <option value={i} key={i}>{WorkTaskPriority[i]}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor={setId('manager')} className="form-label">Менеджер</label>
        <select
          className="form-select"
          id={setId('manager')}
          aria-label="Менеджер"
          value={managerId}
          onChange={e => setManagerId(+e.target.value)}
        >
          {users.filter(u => !memberIds.find(m => m === u.id)).map(u => (
            <option value={u.id} key={u.id}>{u.fullName}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor={setId('members')} className="form-label">Исполнители</label>
        <select
          className="form-select"
          id={setId('members')}
          aria-label="Исполнители"
          value='choose'
          onChange={e => {
            const value: string = e.target.value;
            if (value !== 'choose') {
              setMemberIds((members) => {
                return [...members, +value]
              })
            }
          }}
        >
          <option value="choose" key='choose'>Выберите из списка</option>
          {users.filter(u => !(memberIds.find(m => m === u.id) || managerId === u.id)).map(u => (
            <option value={u.id} key={u.id}>{u.fullName}</option>
          ))}
        </select>
        <div className='bg-light rounded mt-2'>
          {(memberIds.length === 0) && (
            <button className='btn btn-link' disabled
              style={{textDecoration: 'none'}}
            >
              Исполнители не выбраны
            </button>
          )}
          {memberIds.map(m => {
            const user = users.find(u => u.id === m);

            if (!user) return <></>;

            return (
              <button
                className='btn btn-link'
                key={user.id}
                onClick={e => setMemberIds(members => {
                  return members.filter(m => m !== user.id)
                })}
              >
                {user.fullName}
              </button>
            )
          })}
        </div>
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

const getEnumEntryByValue = <EnumType,>(value: EnumType[keyof EnumType], enumType: EnumType ) => {
  return getEnumEntries(enumType).filter(e => {
    return enumType[e] === value;
  })[0]
}

const setEnumByEntry = <EnumType,>(entry: string, enumType: EnumType) => {
  return enumType[entry as keyof typeof enumType];
}

const getEnumEntries = <EnumType,>(enumType: EnumType) => {
  return (Object.keys(enumType) as Array<keyof typeof enumType>)
}

export default WorkTaskModal;
