/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  values: any[];
  labels: string[];
  backgroundColors: string[];
  addTotal?: boolean;
}

const DonutChart = ({
  values,
  labels,
  backgroundColors,
  addTotal = false,
}: DonutChartProps) => {
  const total = values.reduce((acc, value) => acc + value, 0);
  const lastValue = 100 - total;

  const data = {
    labels: labels,
    datasets: [
      {
        data: addTotal ? [...values, lastValue] : [...values],
        backgroundColor: backgroundColors,
        borderWidth: 0,
        borderRadius: 0,
        cutout: "75%",
        spacing: 3,
      },
    ],
  };

  const options: any = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return <Doughnut data={data} options={options} />;
};

export default DonutChart;
