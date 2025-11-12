/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Legend, Title, Tooltip);

interface GaugeChartProps {
  values: number[];
  backgroundColor: Array<string>;
}
const GaugeChart = ({ backgroundColor, values }: GaugeChartProps) => {
  const data = {
    labels: [],
    datasets: [
      {
        data: [values[0], values[1]], // Closed percentage and gap percentage
        backgroundColor: backgroundColor,
        borderWidth: 0,
        cutout: "83%",
        circumference: 180,
        rotation: 270,
        borderRadius: 4,
      },
    ],
  };

  const options: any = {
    maintainAspectRatio: false,
  };

  return <Doughnut data={data} options={options} />;
};

export default GaugeChart;
