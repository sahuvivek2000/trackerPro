import React, { useState } from 'react';
import { useQuery, useAction, getIssueDetails, createComment, uploadAttachment } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const IssueDetailsPage = () => {
  const { data: issue, isLoading, error } = useQuery(getIssueDetails);
  const createCommentFn = useAction(createComment);
  const uploadAttachmentFn = useAction(uploadAttachment);
  const [newCommentText, setNewCommentText] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateComment = () => {
    createCommentFn({ issueId: issue.id, commentText: newCommentText });
    setNewCommentText('');
  };

  const handleUploadAttachment = (file) => {
    uploadAttachmentFn({ issueId: issue.id, file });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>{issue.title}</h1>
      <p className='mb-4'>{issue.description}</p>
      <div className='mb-4'>
        Comments:
        {issue.comments.map((comment) => (
          <div key={comment.id} className='border p-2 my-2'>
            <p>{comment.commentText}</p>
            <p className='text-gray-500 text-sm'>{comment.timestamp}</p>
          </div>
        ))}
      </div>
      <textarea
        value={newCommentText}
        onChange={(e) => setNewCommentText(e.target.value)}
        placeholder='Add a comment...'
        className='border p-2 my-4 w-full'
      ></textarea>
      <button onClick={handleCreateComment} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add Comment</button>
      <input type='file' onChange={(e) => handleUploadAttachment(e.target.files[0])} className='my-4' />
      <Link to={`/`} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2'>Back to Dashboard</Link>
    </div>
  );
}

export default IssueDetailsPage;