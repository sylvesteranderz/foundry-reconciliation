/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';

interface IOverlayComponent {
	open: boolean;
	close: () => void;
	children: React.ReactNode;
}

const OverlayComponent = ({ open, close, children }: IOverlayComponent) => {
	const [indexOut, setIndexOut] = useState('');
	const outerRef = useRef<any>(null);

	useEffect(() => {
		if (open) setIndexOut('');

		if (!open) {
			setTimeout(() => setIndexOut('index-out'), 350);
		}
	}, [open]);

	return (
		<div
			ref={outerRef}
			onClick={(e) => e.target == outerRef.current && close()}
			className={
				open
					? 'open-custom-overlay overflow-x-clip z-50'
					: `close-custom-overlay overflow-x-clip ${indexOut}`
			}>
			{children}
		</div>
	);
};

export default OverlayComponent;
