interface MultiProgressBarProps {
  backgroundColor?: string;
  radius?: string;
  height?: string;
  visualParts: {
    percentage: string;
    color?: string;
  }[];
}

const getColorFromPercentage = (percentage: number): string => {
  if (percentage <= 25) {
    return '#FF0000';
  } else if (percentage <= 89) {
    return '#E80054';
  } else if (percentage <= 90) {
    return '#FFA800';
  } else if (percentage >= 100) {
    return '#619B7D';
  }
  return '#F4B233';
};

const MultiProgressBar = ({
  backgroundColor,
  radius = 'rounded-[2.5px]',
  visualParts = [
    {
      percentage: '0%',
      color: 'white',
    },
  ],
  height = 'h-[10px]',
}: MultiProgressBarProps) => {
  return (
    <div
      className={`flex ${height} w-full ${radius} mx-0`}
      style={{
        backgroundColor: backgroundColor ? backgroundColor : '#e5e7eb',
      }}>
      {visualParts.map((item, index) => {
        const percentage = parseFloat(item.percentage);
        const color = getColorFromPercentage(percentage);

        return (
          <div
            key={index}
            style={{
              width: `${percentage}%`,
              backgroundColor: item.color ? item.color : color,
            }}
            className={`progressVisualPart ${radius} `}
          />
        );
      })}
    </div>
  );
};

export default MultiProgressBar;
