import React, { useEffect, useState } from 'react';
import {CommentDto, createComment, getCommentsByTaskId} from "../../data";
import Comment from './Comment';
import MessageField from './MessageField';

type CommentsListProps = {
  taskId: number
}

const CommentsList: React.FC<CommentsListProps> = ({taskId}) => {
  const [comments, setComments] = useState<CommentDto[]>([]);

  const sortComments = (comments: CommentDto[]) => {
    return comments.sort((c1, c2) => c1.timestamp - c2.timestamp);
  }

  const fetchComments = () => {
    const comments = getCommentsByTaskId(taskId);
    setComments(sortComments(comments));
  }

  useEffect(() => {
    fetchComments();
  }, [])

  const onReplyHandle = (text: string, taskId: number, userId: number, parentCommentId: number) => {
    createComment(text, taskId, userId, parentCommentId);
    fetchComments();
  }

  const getCommentWithChildrens = (comments: CommentDto[], comment: CommentDto): React.ReactNode => {
    return (
      <Comment data={comment} key={comment.id} onReply={onReplyHandle}>
        {comments.filter(c => c.parentCommentId === comment.id).map(c => {
          return getCommentWithChildrens(comments, c)
        })}
      </Comment>
    )
  }

  return (
    <div className='p-3'>
      <h5 className='mb-3'>Обсуждение задачи</h5>
      <MessageField onSend={(message) => {
        createComment(message, taskId, 1);
        fetchComments();
      }}/>
      {!comments.length && <div className='py-3'>Здесь еще нет комментариев</div> }
      {comments.filter(c => !c.parentCommentId).map(c => {
        return getCommentWithChildrens(comments, c)
      })}
    </div>
  );
};

export default CommentsList;
