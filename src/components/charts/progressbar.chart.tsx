// ProgressBarChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface DataSet {
  label: string;
  data: number[];
  backgroundColor: string;
}

interface ProgressBarChartProps {
  dataSets: DataSet[];
}

const ProgressBarChart: React.FC<ProgressBarChartProps> = ({ dataSets }) => {
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
    labels: dataSets.map((set) => set.label),
    datasets: [
      {
        data: dataSets.map((set) => set.data[0]),
        backgroundColor: dataSets.map((set) => set.backgroundColor),
        barThickness: 20,
        borderRadius: 15,
      },
      {
        data: dataSets.map((set) => 100 - set.data[0]), // The remaining part of the bar
        backgroundColor: "#E6E6E6",
        barThickness: 20,
        borderRadius: 15,
      },
    ],
  };

  return <Bar data={data} options={options} />;
};

export default ProgressBarChart;
