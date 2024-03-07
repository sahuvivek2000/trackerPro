import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, getIssues } from 'wasp/client/operations';

const DashboardPage = () => {
  const { data: issues, isLoading, error } = useQuery(getIssues);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {issues.map((issue) => (
        <div key={issue.id} className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{issue.title}</div>
          <div>{issue.status}</div>
          <div>{issue.assignee.username}</div>
          <Link to={`/issues/${issue.id}`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Details</Link>
        </div>
      ))}
    </div>
  );
}

export default DashboardPage;