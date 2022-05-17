import React, { useState } from 'react';

type MessageFieldProps = {
  onSend: (message: string) => void
}

const MessageField: React.FC<MessageFieldProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const [showBlankMessageError, setShowBlankMessageError] = useState(false);

  const onSendHandle = () => {
    if (!message) {
      setShowBlankMessageError(true);
      return;
    }
    setShowBlankMessageError(false);
    onSend(message);
    setMessage('');
  }

  return (
    <div>
      <div className="form-floating">
        <textarea
          id="floatingComm"
          className="form-control"
          value={message}
          style={{ height: '100px' }}
          rows={3}
          onInput={e => setShowBlankMessageError(false) }
          onChange={e => setMessage(e.target.value)}
        ></textarea>
        <label htmlFor="floatingComm">Текст сообщения</label>
      </div>
      <div className="mt-2 row align-items-center">
        <div className="col-sm-4">
          <button className='btn btn-primary' onClick={onSendHandle}>Отправить</button>
        </div>
        <div className="col">
          {showBlankMessageError && (
            <p className='text-end fs-5 lh-1 text-danger m-0'>Введите текст сообщения!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageField;
