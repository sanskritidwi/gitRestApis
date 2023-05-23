import React, { useEffect, useState } from 'react';

const Chart = React.memo(({ data }) => {
  const [Highcharts, setHighcharts] = useState(null);
  const [HighchartsReact, setHighchartsReact] = useState(null);

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

  if (!Highcharts || !HighchartsReact) {
    // Render a placeholder or loading state while the dependencies are being loaded
    return <div style={{color:"white"}}>Loading...</div>;
  }

  // Render the actual chart once the dependencies are loaded
  const dataArray = Array.isArray(data) ? data : [];

    const options = {
        title: {
          text: 'Total Changes',
        },
        xAxis: {
          title: {
            text: 'Week',
          },
        },
        yAxis: {
          title: {
            text: 'Total Count',
          },
        },
        series: [{
          data: dataArray.map((weekData) => weekData.total),
        }],
      };

      dataArray.map((weekData) => console.log(weekData.total))

      if(data)
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </div>
    );
  });

  export default Chart;
  