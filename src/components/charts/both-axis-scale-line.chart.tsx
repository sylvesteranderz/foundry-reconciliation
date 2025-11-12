/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  LineController,
  PointElement,
  Title,
  Tooltip,
  LineElement,
  CategoryScale,
} from 'chart.js';
import { useTheme } from '../theme-provider';

ChartJS.register(
  LinearScale,
  LineController,
  PointElement,
  Title,
  Tooltip,
  LineElement,
  CategoryScale
);
interface BothAxisScaleLineChartProps {
  datasets: Array<{
    data: number[];
    borderColor: string;
    borderWidth: number;
    label: string;
  }>;
  labels: Array<string>;
  stepSize?: number;
  minSize?: number;
  maxSize?: number;
}

const BothAxisScaleLineChart: React.FC<BothAxisScaleLineChartProps> = ({
  datasets,
  labels,
  maxSize,
  minSize,
  stepSize,
}) => {
  const { theme } = useTheme();

  const chartData = {
    labels: labels,
    datasets: datasets.map((dataset) => ({
      data: dataset.data,
      borderColor: dataset.borderColor,
      borderWidth: dataset.borderWidth,
      fill: false,
      pointRadius: 1,
      label: dataset.label,
    })),
  };

  const options: any = {
    scales: {
      x: {
        grid: {
          display: true,
          color: theme === 'light' ? '#b5b5b5' : '#4F4F4F',
        },
        border: {
          dash: [2, 5],
        },
        ticks: {
          color: theme === 'light' ? '' : '#D0D5DD',
          font: {
            size: 13,
          },
        },
      },
      y: {
        beginAtZero: true,
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: theme === 'light' ? '' : '#D0D5DD',
          font: {
            size: 12,
          },
          stepSize: stepSize,
          max: maxSize,
          min: minSize,
          callback: function (value: number) {
            if (value >= 1000) {
              return '$' + value / 1000 + 'K';
            } else {
              return '$' + value;
            }
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return <Line data={chartData} options={options} />;
};

export default BothAxisScaleLineChart;
