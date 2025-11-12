import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const labels = [
  '0',
  '10',
  '20',
  '30',
  '40',
  '50',
  '60',
  '70',
  '80',
  '90',
  '100',
];

const dataset1Data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const dataset3Data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const data = {
  labels,
  datasets: [
    {
      type: 'line' as const,
      tension: 0.6,
      label: 'Cost',
      borderColor: '#E5E7EB',
      borderWidth: 2,
      fill: false,
      data: dataset1Data,
    },
    {
      type: 'bar' as const,
      label: 'Inventory',
      backgroundColor: [
        '#619B7D',
        '#619B7D',
        '#DEEDF0',
        '#DEEDF0',
        '#DEEDF0',
        '#FED8CB',
        '#FED8CB',
        '#FED8CB',
        '#FED8CB',
        '#FED8CB',
        '#FED8CB',
      ],
      data: dataset3Data,
    },
  ],
};

export function MultitypeCHart() {
  return (
    <Chart
      type="bar"
      data={data}
      options={{
        scales: {
          x: {
            grid: {
              display: true,
              color: '#4F4F4F',
            },
            title: {
              display: true,
              text: 'Inventory (%)',
              color: '#929292',
              font: {
                size: 14,
              },
            },
            border: {
              dash: [2, 5],
            },
            min: 0,
            max: 100,
            ticks: {
              stepSize: 10,
            },
          },
          y: {
            grid: {
              display: true,
              color: '#4F4F4F',
            },
            title: {
              display: true,
              text: 'Cost (%)',
              color: '#929292',
              font: {
                size: 14,
              },
            },
            border: {
              dash: [2, 5],
            },
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        maintainAspectRatio: false,
      }}
    />
  );
}
