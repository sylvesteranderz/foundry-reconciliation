import ProgressBar from '@ramonak/react-progress-bar';
import React from 'react';
import { useTheme } from './theme-provider';

interface CustomProgressBarProps {
	completed: number;
	height: string;
}

const CustomProgressBar: React.FC<CustomProgressBarProps> = ({
	completed,
	height,
}) => {
	const { theme } = useTheme();

	let bgColor = '#F4B233';

	if (completed <= 25) {
		bgColor = '#FF0000';
	} else if (completed <= 89) {
		bgColor = '#E80054';
	} else if (completed <= 90) {
		bgColor = '#FFA800';
	} else if (completed >= 100) {
		bgColor = '#3DE086';
	}

	return (
		<ProgressBar
			completed={completed}
			className="w-full"
			bgColor={bgColor}
			labelColor="black"
			baseBgColor={theme === 'light' ? '#e5e7eb' : '#151A20'}
			height={height}
			isLabelVisible={false}
		/>
	);
};

export default CustomProgressBar;
