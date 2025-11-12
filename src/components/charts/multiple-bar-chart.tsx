/* eslint-disable @typescript-eslint/no-explicit-any */
// BarChart.tsx
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  Title,
  Tooltip,
  PointElement,
  Legend,
  BarElement,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '../theme-provider';

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Filler,
  PointElement,
  Legend,
  BarElement
);

interface BarChartProps {
  dataSets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
  labels: string[];
  borderDash?: number[];
  titleY?: string;
  titleX?: string;
  stepSize?: number;
  minSize?: number;
  maxSize?: number;
}

const BarChart: React.FC<BarChartProps> = ({
  dataSets,
  labels,
  borderDash,
  titleY,
  titleX,
  maxSize,
  minSize,
  stepSize,
}) => {
  const { theme } = useTheme();

  const options: any = {
    scales: {
      x: {
        grid: {
          color: '#4F4F4F',
          display: false,
        },
        title: {
          display: titleX ? true : false,
          text: titleX,
          color: '#929292',
          font: {
            size: 14,
          },
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
        grid: {
          color: theme === 'light' ? '#dbdbdb' : '#4F4F4F',
        },
        border: {
          dash: borderDash,
        },
        ticks: {
          color: theme === 'light' ? '' : '#D0D5DD',
          font: {
            size: 12,
          },
          stepSize: stepSize,
          max: maxSize,
          min: minSize,
        },
        title: {
          display: titleY ? true : false,
          text: titleY,
          color: '#929292',
          font: {
            size: 14,
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

  const ds = Array.from(dataSets || []).map((dataset) => ({
    label: dataset?.label,
    data: dataset?.data,
    backgroundColor: dataset?.backgroundColor,
    borderRadius: 6,
    borderWidth: 0,
  }));
  const data = {
    labels,
    datasets: [...ds],
  };
  return <Bar data={data} options={options} />;
};

export default BarChart;
