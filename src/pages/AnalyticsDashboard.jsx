import React from 'react';
import { useQuery, getAnalytics } from 'wasp/client/operations';

const AnalyticsDashboardPage = () => {
  const { data: analyticsData, isLoading, error } = useQuery(getAnalytics);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {analyticsData.map((dataPoint) => (
        <div key={dataPoint.id} className='bg-white shadow-md p-4 mb-4 rounded-lg'>
          <p>{dataPoint.metricName}: {dataPoint.value}</p>
        </div>
      ))}
    </div>
  );
}

export default AnalyticsDashboardPage;