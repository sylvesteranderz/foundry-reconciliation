// ProgressBarChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface DataSet {
  label: string;
  data: number[];
  backgroundColor: string[];
}

interface ProgressBarChartProps {
  dataSets: DataSet[];
  labels: string[];
}

const DividedProgressBarChart: React.FC<ProgressBarChartProps> = ({
  dataSets,
  labels,
}) => {
  const options: any = {
    indexAxis: "y" as const,
    scales: {
      x: {
        stacked: true,
        display: false,
      },
      y: {
        stacked: true,
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const data = {
    labels,
    datasets: dataSets.map((set) => ({
      label: set.label,
      data: set.data,
      backgroundColor: set.backgroundColor,
      borderRadius: 20, // Increase borderRadius for more rounding
      barThickness: 30, // Set bar height
    })),
  };

  return <Bar data={data} options={options} />;
};

export default DividedProgressBarChart;
