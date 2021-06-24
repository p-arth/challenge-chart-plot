import React from 'react';
import { Line } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';

const UltimateChart = ({}) => {
  defaults.font.family = "'Source Code Pro', 'monospace'";
  defaults.font.weight = '500';
  defaults.font.size = 12;
  defaults.animation = true;

  return (
    <div className="chart-container">
      <Line
        data={{ placeholder }}
        type={'line'}
        // width={150}
        // height={50}
        options={{
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
        }}
      />
    </div>
  );
};

export default UltimateChart;
