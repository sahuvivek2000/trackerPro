import React from 'react';
import { useQuery, useAction, getIssues } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const IssueListPage = () => {
  const { data: issues, isLoading, error } = useQuery(getIssues);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {issues.map((issue) => (
        <div key={issue.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{issue.title}</div>
          <div>{issue.description}</div>
          <div>{issue.status}</div>
          <div>{issue.priority}</div>
          <div>{issue.assignee.username}</div>
          <div>{new Date(issue.createdDate).toLocaleString()}</div>
          <div>{new Date(issue.updatedDate).toLocaleString()}</div>
          <Link to={`/issues/${issue.id}`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Details</Link>
        </div>
      ))}
    </div>
  );
}

export default IssueListPage;