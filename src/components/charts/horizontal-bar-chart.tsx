/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '../theme-provider';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

interface HorizontalBarChartProps {
	labels: Array<string>;
	borderDash: number[];
	dataSets: {
		label: string;
		data: number[];
		backgroundColor: string[];
	};
}

const HorizontalBarChart = ({
	dataSets,
	labels,
	borderDash,
}: HorizontalBarChartProps) => {
	const { theme } = useTheme();
	const options: any = {
		indexAxis: 'y' as const,
		scales: {
			x: {
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
				},
			},
			y: {
				beginAtZero: true,
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

	const data = {
		labels,
		datasets: [
			{
				label: dataSets?.label,
				data: dataSets?.data,
				backgroundColor: dataSets?.backgroundColor,
				borderRadius: 6,
				borderWidth: 0,
			},
		],
	};
	return <Bar options={options} data={data} />;
};

export default HorizontalBarChart;
