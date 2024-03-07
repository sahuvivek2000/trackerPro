import React, { useState } from 'react';
import { useAction, createIssue } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const IssueCreationPage = () => {
  const createIssueFn = useAction(createIssue);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [assigneeId, setAssigneeId] = useState('');

  const handleCreateIssue = () => {
    createIssueFn({
      title: title,
      description: description,
      priority: priority,
      assigneeId: assigneeId
    });
  };

  return (
    <div className='p-4'>
      <input
        type='text'
        placeholder='Title'
        className='px-1 py-2 border rounded text-lg'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder='Description'
        className='px-1 py-2 border rounded text-lg'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input
        type='text'
        placeholder='Priority'
        className='px-1 py-2 border rounded text-lg'
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      />
      <input
        type='text'
        placeholder='Assignee ID'
        className='px-1 py-2 border rounded text-lg'
        value={assigneeId}
        onChange={(e) => setAssigneeId(e.target.value)}
      />
      <button
        onClick={handleCreateIssue}
        className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
      >
        Create Issue
      </button>
    </div>
  );
}

export default IssueCreationPage;