import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// import { te } from "date-fns/locale";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = (
  hideGrid?: boolean,
  hideXAxes?: boolean,
  hideYAxes?: boolean,
  horizontalGrid?: boolean
) => ({
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: hideXAxes || horizontalGrid ? false : true,
      grid: {
        display: hideGrid || horizontalGrid ? false : true,
        color: "#D0D5DD", // Set grid color
      },
    },
    y: {
      display: hideYAxes ? false : true,
      grid: {
        display: hideGrid ? false : true,
        color: "rgba(200, 200, 200, 0.2)",
      },
      ticks: {
        callback: (value: any) => {
          return value >= 1000 ? value / 1000 + "k" : value; // Convert to "k" units
        },
      },
      beginAtZero: true,
    },
  },
  maintainAspectRatio: false,
});

const customGridLinePlugin = {
  id: "customGridLine",
  afterDatasetsDraw: (chart: any) => {
    const { ctx, chartArea, scales } = chart;
    const yScale = scales.y;

    // Draw a vertical dotted line at the end of the chart
    ctx.save();
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(chartArea.right, yScale.top);
    ctx.lineTo(chartArea.right, yScale.bottom);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(200, 200, 200, 0.8)";
    ctx.stroke();
    ctx.restore();
  },
};

const generateData = (
  labels: string[],
  data1: number[],
  data2: number[],
  tension: number = 0.2,
  hideGrid?: number,
  horizontalGrid?: boolean,
  borderColor?: string,
  borderWidth?: number
) => {
  const lastIndex1 = data1.length - 1;
  const lastIndex2 = data2?.length - 1;

  return {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: data1,
        borderColor: borderColor
          ? borderColor
          : horizontalGrid
          ? "#C6D9CF"
          : "#619B7D",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: tension,
        pointRadius: data1.map((_, index) =>
          horizontalGrid ? 5 : hideGrid && index === lastIndex1 ? 5 : 0
        ),
        pointBackgroundColor: data1.map((_, index) =>
          borderColor
            ? borderColor
            : horizontalGrid
            ? "#C6D9CF"
            : index === lastIndex2
            ? "#C6D9CF"
            : "rgba(0, 0, 0, 0)"
        ),
        borderWidth: borderWidth,
      },
      {
        label: "Dataset 2",
        data: data2,
        borderColor: "#C6D9CF",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: tension,
        pointRadius: data2?.map((_, index) =>
          hideGrid && index === lastIndex2 ? 5 : 0
        ), // Show point only for the last data point
        pointBackgroundColor: data2?.map((_, index) =>
          index === lastIndex2 ? "#C6D9CF" : "rgba(0, 0, 0, 0)"
        ),
        borderWidth: borderWidth,
      },
    ],
  };
};

interface LineChartProps {
  labels: string[];
  data1: number[];
  data2: number[];
  tension?: number;
  hideGrid?: boolean;
  hideXAxes?: boolean;
  hideYAxes?: boolean;
  horizontalGrid?: boolean;
  borderColor?: string;
  borderWidth?: number;
}

export const PerformanceInsightLineChart: React.FC<LineChartProps> = ({
  labels,
  data1,
  data2,
  tension = 0.2,
  hideGrid,
  hideXAxes,
  hideYAxes,
  horizontalGrid,
  borderColor,
  borderWidth,
}) => {
  const data = generateData(
    labels,
    data1,
    data2,
    tension,
    hideGrid ? 1 : 0,
    horizontalGrid,
    borderColor,
    borderWidth
  );
  const plugins = hideGrid ? [customGridLinePlugin] : [];

  return (
    <Line
      options={options(hideGrid, hideXAxes, hideYAxes)}
      data={data}
      plugins={plugins}
    />
  );
};
