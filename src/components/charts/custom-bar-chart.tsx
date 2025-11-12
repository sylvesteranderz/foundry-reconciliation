/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	CategoryScale,
	Chart as ChartJS,
	Filler,
	LinearScale,
	Title,
	Tooltip,
	PointElement,
	Legend,
	BarElement,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Filler,
	PointElement,
	Legend,
	BarElement,
);

interface BarDataSet {
	label: string;
	data: number[];
	backgroundColor: string;
}

interface CustomBarChartProps {
	dataSets: BarDataSet[];
	labels: string[];
	stacked?: boolean;
}

const CustomBarChart: React.FC<CustomBarChartProps> = ({
	dataSets,
	labels,
	stacked = false,
}) => {
	const options: any = {
		scales: {
			x: {
				grid: {
					display: false,
				},
				stacked,
				ticks: {
					color: '#D0D5DD',
					font: {
						size: 13,
					},
				},
			},
			y: {
				beginAtZero: true,
				grid: {
					display: false,
				},
				ticks: {
					color: '#D0D5DD',
					font: {
						size: 12,
					},

					stepSize: 1,
					max: 4,
					min: 0,
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

	const datasets = dataSets.map((dataSet) => {
		return {
			label: dataSet.label,
			data: dataSet.data,
			backgroundColor: dataSet.backgroundColor,
			borderRadius: 2,
			borderWidth: 0,
		};
	});

	const data = {
		labels,
		datasets,
	};

	return <Bar data={data} options={options} />;
};

export default CustomBarChart;
