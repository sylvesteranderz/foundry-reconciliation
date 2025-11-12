/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	LinearScale,
	LineController,
	PointElement,
	Title,
	Tooltip,
	LineElement,
	CategoryScale,
} from 'chart.js';
import { useTheme } from '../theme-provider';

ChartJS.register(
	LinearScale,
	LineController,
	PointElement,
	Title,
	Tooltip,
	LineElement,
	CategoryScale,
);
interface FillLineChartProps {
	datasets: Array<{
		data: number[];
		borderColor: string;
		borderWidth: number;
		label: string;
		backgroundColor: string;
		pointRadiusOff?: boolean;
		tension?: number;
		fill?:boolean
	}>;
	labels: Array<string>;
}

const FillLineChart: React.FC<FillLineChartProps> = ({
	datasets,
	labels,

}) => {
	const { theme } = useTheme();

	const chartData = {
		labels: labels,
		datasets: datasets.map((dataset) => ({
			data: dataset.data,
			borderColor: dataset.borderColor,
			borderWidth: dataset.borderWidth,
			fill: dataset.fill ? dataset.fill : true,
			pointRadius: dataset.pointRadiusOff ? 0 : 1,
			label: dataset.label,
			tension: dataset.tension,
			backgroundColor: dataset.backgroundColor,
		})),
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
				beginAtZero: true,
				display: false,
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

export default FillLineChart;
