import React, { useEffect, useMemo, useState } from 'react';
import DataActions from '../../utils/data/DataActions';
import { UserDto, WorkTaskDto, WorkTaskPriority } from '../../utils/data/Types';
import useUniqueId from '../../utils/UniqueID';

export type WorkTaskFormProps = {
  value: WorkTaskDto | undefined;
  onChange: (workTask: WorkTaskDto) => void;
}

const WorkTaskForm: React.FC<WorkTaskFormProps> = ({
  value, onChange
}) => {
  const [id] = useState(useUniqueId('WTForm-'));
  const [workTask, setWorkTask] = useState(value || getBlankWorkTask());

  const [users, setUsers] = useState<UserDto[]>([]);

  useMemo(() => {
    setWorkTask(value || getBlankWorkTask());
  }, [value]);

  useEffect(() => {
    setUsers(DataActions.getAllUsers())
  }, []);

  const setWorkTaskHandler = (workTask: WorkTaskDto) => {
    setWorkTask(workTask);
    onChange(workTask);
  }

  const setId = (name: string) => {
    return `${name}_${id}`
  }

  return (
    <div>
      <div className="mb-3">
        <label htmlFor={setId('priority')} className="form-label">Приоритет</label>
        <select
          className="form-select"
          id={setId('priority')}
          aria-label="Приоритет"
          value={getEnumEntryByValue(workTask.priority, WorkTaskPriority)}
          onChange={e => setWorkTaskHandler({
            ...workTask,
            priority: setEnumByEntry(e.target.value, WorkTaskPriority)
          })}
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
          value={workTask.managerId}
          onChange={e => setWorkTaskHandler({
            ...workTask,
            managerId: +e.target.value
          })}
        >
          {users.filter(u => !workTask.memberIds.find(m => m === u.id)).map(u => (
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
              setWorkTaskHandler(({ ...workTask, memberIds: [...workTask.memberIds, +value]}))
            }
          }}
        >
          <option value="choose" key='choose'>Выберите из списка</option>
          {users.filter(u => !(workTask.memberIds.find(m => m === u.id) || workTask.managerId === u.id)).map(u => (
            <option value={u.id} key={u.id}>{u.fullName}</option>
          ))}
        </select>
        <div className='bg-light rounded mt-2'>
          {(workTask.memberIds.length === 0) && (
            <button className='btn btn-link' disabled
              style={{ textDecoration: 'none' }}
            >
              Исполнители не выбраны
            </button>
          )}
          {workTask.memberIds.map(m => {
            const user = users.find(u => u.id === m);

            if (!user) return <></>;

            return (
              <button
                className='btn btn-link'
                key={user.id}
                onClick={e => setWorkTaskHandler(({
                  ...workTask,
                  memberIds: workTask.memberIds.filter(m => m !== user.id)
                })) }
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
          value={workTask.status}
          onChange={e => setWorkTaskHandler(({
            ...workTask,
            status: e.target.value
          }))}
        />
      </div>
      <div className="mb-3 row">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <label htmlFor={setId('startDate')} className="form-label">Дата начала</label>
          <input
            type="datetime-local"
            className="form-control"
            id={setId('startDate')}
            value={getLocalTimeValue(workTask.startDate)}
            onChange={e => setWorkTaskHandler(({
              ...workTask,
              startDate: getUtcTimeFromLocal(e.target.value)
            }))}
          />
        </div>
        <div className="col-sm-6">
          <label htmlFor={setId('endDate')} className="form-label">Дата завершения</label>
          <input
            type="datetime-local"
            className="form-control"
            id={setId('endDate')}
            value={getLocalTimeValue(workTask.finishDate)}
            onChange={e => setWorkTaskHandler(({
              ...workTask,
              finishDate: getUtcTimeFromLocal(e.target.value)
            }))}
          />
        </div>
      </div>
    </div>
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

const getLocalTimeValue = (date: string): string => {
  const now = new Date(date);
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

const getUtcTimeFromLocal = (date: string): string => {
  const now = new Date(date);
  return now.toISOString();
}

const getEnumEntryByValue = <EnumType,>(value: EnumType[keyof EnumType], enumType: EnumType) => {
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

export default WorkTaskForm;
