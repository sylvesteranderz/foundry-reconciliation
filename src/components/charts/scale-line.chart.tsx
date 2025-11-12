/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// ScaleLineChart.tsx
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
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

interface ScaleLineChartProps {
  labels: Array<string>;
  datasets: Array<{
    data: number[];
    borderColor: string;
    borderWidth: number;
    label: string;
    backgroundColor?: string;
    pointRadiusOff?: boolean;
    tension?: number;
    fill?: string;
  }>;
  beginAtZero?: boolean;
}

const ScaleLineChart: React.FC<ScaleLineChartProps> = ({
  labels,
  datasets,
  beginAtZero = false,
}) => {
  const { theme } = useTheme();

  const chartData = {
    labels: labels,
    datasets: datasets?.map((dataset) => ({
      data: dataset.data,
      borderColor: dataset.borderColor,
      borderWidth: dataset.borderWidth,
      fill: dataset.fill === 'no' ? false : true,
      pointRadius: dataset.pointRadiusOff ? 0 : 2,
      label: dataset.label,
      tension: dataset.tension,
      backgroundColor: dataset.backgroundColor
        ? dataset.backgroundColor
        : 'transparent',
    })),
  };

  const options: any = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme === 'light' ? '' : '#D0D5DD',
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: beginAtZero,
        grid: {
          display: false,
        },
        ticks: {
          color: theme === 'light' ? '' : '#D0D5DD',
          font: {
            size: 12,
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

export default ScaleLineChart;
