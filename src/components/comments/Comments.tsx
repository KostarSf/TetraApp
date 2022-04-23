import React, { useEffect, useState } from 'react';
import avatar from './_avatar.jpg';

type com = {
  text: string;
  date: string;
}

const Comments: React.FC = () => {
  const [comms, setComms] = useState<com[]>([]);
  const [comField, setComField] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('comments');
    if (data) {
      setComms(JSON.parse(data));
    }
  }, [])

  return (
    <div className='p-3'>
      <h5>Обсуждение задачи</h5>
      {!comms.length && <div className='py-3'>Здесь еще нет комментариев</div> }
      {comms.map(c =>
        <div className='my-4'>
          <div className=''>
            <div className='lead d-flex align-items-center'>
              <img src={avatar} style={{width: '24px'}} className="border rounded-circle me-2" />
              Максим Песков
            </div>
            <div className='text-secondary align-self-end'>Сегодня, в {c.date}</div>
          </div>
          <div>{c.text}</div>
        </div>
      )}
      <div>
        <textarea className="form-control" value={comField} onChange={e => setComField(e.target.value)} rows={3}></textarea>
        <div className="mt-2">
          <button className='btn btn-primary' onClick={() => {
            const newComs = [...comms, { text: comField, date: getTime() }];
            setComms(newComs);
            localStorage.setItem('comments', JSON.stringify(newComs));
            setComField('');
          }}>Отправить</button>
        </div>
      </div>
    </div>
  );
};

function getTime() {
  const time = new Date();
  return time.getHours() + ':' + (time.getMinutes() < 10 ? `0${time.getMinutes()
    }` : time.getMinutes())
}

export default Comments;
