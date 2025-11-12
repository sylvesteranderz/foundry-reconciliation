import { Icon } from '@iconify/react/dist/iconify.js';

interface ArrowWithTextProps {
	title: string;
}

const ArrowWithText = ({ title }: ArrowWithTextProps) => {
	return (
		<div className="flex items-center gap-1">
			<h1 className="leading-4 text-[12.5px] font-medium uppercase">{title}</h1>
			<div>
				<Icon icon="bxs:up-arrow" fontSize={8} />
				<Icon icon="bxs:up-arrow" rotate={2} fontSize={8} />
			</div>
		</div>
	);
};

export default ArrowWithText;
