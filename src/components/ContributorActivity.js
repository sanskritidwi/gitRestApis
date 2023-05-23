import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';

const ContributorActivity = React.memo(({ data }) => {
  const [Highcharts, setHighcharts] = useState(null);
  const [HighchartsReact, setHighchartsReact] = useState(null);
  const [view, setView] = useState('weekly');

  useEffect(() => {
    Promise.all([
      import('highcharts'),
      import('highcharts-react-official')
    ]).then(([highcharts, highchartsReact]) => {
      setHighcharts(highcharts.default);
      setHighchartsReact(highchartsReact.default);
    });
  }, []);

  useEffect(() => {
    if (Highcharts && HighchartsReact && data) {
      // Perform any necessary chart rendering logic here
    }
  }, [Highcharts, HighchartsReact, data]);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  if (!Highcharts || !HighchartsReact) {
    // Render a placeholder or loading state while the dependencies are being loaded
    return <div>Loading...</div>;
  }

  // Render the actual chart once the dependencies are loaded
  const dataArray = Array.isArray(data) ? data : [];


  function convertUnixTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    const formattedDate = date.toLocaleString('en-US', { timeZone: 'UTC' });
    return formattedDate;
  }

  const options = {
    title: {
      text: 'Contributors Stats',
    },
    xAxis: {
      categories: dataArray[0]?.weeks.map((week) => {
        if (view === 'monthly') {
          return `Month ${convertUnixTimestamp(week.w)}`;
        } else if (view === 'yearly') {
          return `Year ${convertUnixTimestamp(week.w)}`;
        } else {
          return `Week ${convertUnixTimestamp(week.w)}`;
        }
      }),
    },
    yAxis: {
      title: {
        text: 'Count',
      },
    },
    series: dataArray.map((contributor) => ({
      name: contributor.author.login,
      data: contributor.weeks.map((week) => {
        if (view === 'monthly') {
          return week.a * 4; // Assuming 4 weeks in a month
        } else if (view === 'yearly') {
          return week.a * 52; // Assuming 52 weeks in a year
        } else {
          return week.a;
        }
      }),
      type: 'line',
    })),
  };

  return (
    <div>
      <div>
        <Button onClick={() => handleViewChange('weekly')}>Weekly</Button>
        <Button onClick={() => handleViewChange('monthly')}>Monthly</Button>
        <Button onClick={() => handleViewChange('yearly')}>Yearly</Button>
      </div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
});

export default ContributorActivity;
