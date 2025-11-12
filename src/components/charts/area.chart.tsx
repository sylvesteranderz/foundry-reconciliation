/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { AreaChart, Area } from 'recharts';

interface CustomAreaChartProps<T> {
	data: {
		[key in keyof T]: number;
	}[];
	stopColor: string;
	height: number;
}

const CustomAreaChart: FC<CustomAreaChartProps<any>> = ({
	data,
	stopColor,
	height,
}) => {
	const firstDataKey = Object.keys(data[0])[0];

	return (
		<AreaChart
			width={400}
			height={height}
			data={data}
			margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
			<defs>
				<linearGradient id={firstDataKey} x1="0" y1="0" x2="100" y2="2">
					<stop offset="5%" stopColor={stopColor} stopOpacity={0.8} />
					<stop offset="95%" stopColor={stopColor} stopOpacity={0} />
				</linearGradient>
			</defs>

			<Area
				type="basis"
				dataKey={firstDataKey}
				stroke="none"
				fillOpacity={1}
				fill={`url(#${firstDataKey})`}
			/>
		</AreaChart>
	);
};

export default CustomAreaChart;
