import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const BarChart = ({
  labels = [],
  dataValues = [],
  label = "Analytics",
  borderColor = '#8B5CF6',
  backgroundColor = 'rgba(139,92,246,0.2)'
}) => {

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {

    const ctx = chartRef.current.getContext('2d');

    /*
    DESTROY OLD CHART
    */

    if (chartInstance.current) {

      chartInstance.current.destroy();

    }

    /*
    CREATE NEW CHART
    */

    chartInstance.current = new Chart(ctx, {

      type: 'line',

      data: {

        labels,

        datasets: [

          {

            label,

            data: dataValues,

            borderColor,

            backgroundColor,

            tension: 0.4,

            fill: true,

            borderWidth: 3,

            pointRadius: 5,

            pointHoverRadius: 7

          }

        ]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

          legend: {

            labels: {

              color: '#fff'

            }

          }

        },

        scales: {

          x: {

            ticks: {

              color: '#9CA3AF'

            },

            grid: {

              color: 'rgba(255,255,255,0.05)'

            }

          },

          y: {

            ticks: {

              color: '#9CA3AF'

            },

            grid: {

              color: 'rgba(255,255,255,0.05)'

            }

          }

        }

      }

    });

    return () => {

      if (chartInstance.current) {

        chartInstance.current.destroy();

      }

    };

  }, [
    labels,
    dataValues,
    label,
    borderColor,
    backgroundColor
  ]);

  return (

    <div className="w-full h-[320px]">

      <canvas ref={chartRef}></canvas>

    </div>

  );

};