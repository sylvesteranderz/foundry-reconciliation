/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// NoScalesLineChart.tsx
import {
  Chart as ChartJS,
  LinearScale,
  LineController,
  PointElement,
  Title,
  Tooltip,
  LineElement,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import React from "react";

ChartJS.register(
  LinearScale,
  LineController,
  PointElement,
  Title,
  Tooltip,
  LineElement,
  CategoryScale
);

interface NoScalesLineChartProps {
  data: number[];
  borderColor: string;
  borderWidth: number;
  labels: string[];
  tension?: number;
}

const NoScalesLineChart: React.FC<NoScalesLineChartProps> = ({
  data,
  borderColor,
  borderWidth,
  labels,
  tension = 0.6,
}) => {
  const borderDash = borderColor === "#E80054" ? [10, 10] : [];

  const chartData = {
    labels,
    datasets: [
      {
        data: data,
        borderColor: borderColor,
        borderWidth: borderWidth,
        fill: false,
        tension: tension,
        pointRadius: 0,
        borderDash: borderDash,
      },
    ],
  };

  const options: any = {
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        beginAtZero: true,
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

export default NoScalesLineChart;
