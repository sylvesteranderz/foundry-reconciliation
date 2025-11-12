/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	CategoryScale,
	Chart as ChartJS,
	Filler,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js';
import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { useTheme } from '../theme-provider';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
	Filler,
);

interface DataPoint {
	x: number;
	y: number;
}

interface ScatterChartProps {
	dataSets: {
		label: string;
		data: DataPoint[];
		backgroundColor: string;
	}[];
	titleX?: string;
	titleY?: string;
	stepSize?: number;
	minSize?: number;
	maxSize?: number;
}

const ScatterChart: React.FC<ScatterChartProps> = ({
	dataSets,
	titleX,
	titleY,
	stepSize = 20,
	maxSize,
	minSize,
}) => {
	const { theme } = useTheme();

	const chartData = {
		datasets: dataSets,
	};

	const options: any = {
		scales: {
			x: {
				type: 'linear',
				position: 'bottom',
				display: titleX ? true : false,
				ticks: {
					stepSize: 10,
				},
				grid: {
					color: theme === 'light' ? '#dbdbdb' : '#4F4F4F',
				},
				title: {
					display: titleX ? true : false,
					text: titleX,
					color: theme === 'light' ? '#2a2a2a' : '#D0D5DD',
					font: {
						size: 15,
						weight: 'bold',
					},
				},
			},
			y: {
				type: 'linear',
				position: 'left',
				display: titleY ? true : false,
				ticks: {
					stepSize: stepSize,
					max: maxSize,
					min: minSize,
				},
				grid: {
					color: theme === 'light' ? '#dbdbdb' : '#4F4F4F',
				},
				title: {
					display: titleY ? true : false,
					text: titleY,
					color: theme === 'light' ? '#2a2a2a' : '#D0D5DD',
					font: {
						size: 15,
						weight: 'bold',
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

	return <Scatter data={chartData} options={options} />;
};

export default ScatterChart;
