import React, { PropsWithChildren, useState } from 'react';
import DataActions from '../../utils/data/DataActions';
import { CommentDto } from '../../utils/data/Types';
import { RelativeTime } from '../../utils/RelativeTime';

type CommentProps = {
  data: CommentDto;
  onReply: (text: string, taskId: number, userId: number, parentCommentId: number) => void;
}

const Comment: React.FC<PropsWithChildren<CommentProps>> = ({ children, onReply, data: { id, taskId, userId, text, timestamp, parentCommentId, user } }) => {
  const [replyVisible, setReplyVisible] = useState(false);
  const [replyMessage, setReplyMessage] = useState(`${user?.fullName.split(' ')[0]}, `);
  const textInput = React.createRef<HTMLTextAreaElement>();

  const commentDate = new Date(timestamp).toISOString();

  const avatar = user?.avatarUrl ? (
    <img src={user?.avatarUrl} style={{ width: '24px' }} className="border rounded-circle me-2" alt='' />
  ) : (
    <div style={{ width: '24px', height: '24px', lineHeight: '22px', textAlign: 'center', userSelect: 'none' }} className="border rounded-circle me-2 bg-white fs-6 text-secondary">
      {user?.fullName[0]}
    </div>
  )

  const replyToggle = () => {
    const newResponseVisible = !replyVisible;
    if (newResponseVisible === true && !replyMessage) {
      setReplyMessage(`${user?.fullName.split(' ')[0]}, `);
    }
    setReplyVisible(newResponseVisible);
  }

  const onReplyHandle = () => {
    onReply(replyMessage, taskId, DataActions.getCurrentUser().id, id);
    setReplyVisible(false);
    setReplyMessage('');
  }

  return (
    <div className='my-4'>
      <div className=''>
        <div className='lead d-flex align-items-center'>
          {avatar}
          {user?.fullName}
        </div>
        <div className='text-secondary align-self-end'>{RelativeTime.fromNowOn(commentDate).toLowerCase()}, в {RelativeTime.displayTime(commentDate)}</div>
      </div>
      <div>{text}</div>
      <button className='btn btn-link' onClick={replyToggle}>Ответить</button>
      {replyVisible && (
        <div className='d-grid d-md-flex gap-2 my-2'>
          <div className="col-md-8 p-0">
            <textarea ref={textInput} id="floatingComm" className="form-control" value={replyMessage} onChange={e => setReplyMessage(e.target.value)} rows={1} placeholder='Введите текст ответа'></textarea>
          </div>
          <div className="col p-0">
            <button className='btn btn-primary w-100' onClick={onReplyHandle}>Отправить</button>
          </div>
        </div>
      )}
      <div className="ps-3 border-start border-3">
        {children}
      </div>
    </div>
  )
}

export default Comment;
