import React from 'react';
import { Line } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';

const UltimateChart = ({ formattedJson }) => {
  defaults.font.family = "'Source Code Pro', 'monospace'";
  defaults.font.weight = '500';
  defaults.font.size = 12;
  defaults.animation = true;

  const chartOptions = {
    layout: {
      padding: {
        left: 12,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'right'
      }
    },
    scales: {
      y: {
        ticks: {
          display: false,
          padding: 15
        }
      }
    }
  };

  // const mockupData = {
  //   labels: ['1', '2', '3', '4'],
  //   datasets: [
  //     {
  //       label: '# of Things',
  //       data: [12, 19, 3, 5],
  //       fill: false,
  //       backgroundColor: 'rgb(255, 99, 132)',
  //       borderColor: 'rgba(255, 99, 132, 0.2)'
  //     },
  //     {
  //       label: '# of Stuff',
  //       data: [7, 9, 6, 5],
  //       fill: false,
  //       backgroundColor: 'rgb(255, 99, 12)',
  //       borderColor: 'rgba(255, 9, 12, 0.2)'
  //     }
  //   ]
  // };

  let data = formattedJson;

  return (
    <div data-cy="chart-container" className="chart-container">
      <Line data={data} type={'line'} className={'chart-canvas'} options={chartOptions} />
    </div>
  );
};

export default UltimateChart;
