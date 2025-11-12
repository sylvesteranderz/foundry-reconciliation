import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';

interface CarouselProps {
	slides: JSX.Element[];
	slidesToShow: number;
	slidesToScroll: number;
}

const Carousel: React.FC<CarouselProps> = ({
	slides,
	slidesToShow,
	slidesToScroll,
}) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const carouselRef = useRef<HTMLDivElement>(null);

	const totalSlides = slides.length;

	const nextSlide = () => {
		const nextIndex = activeIndex + 1;
		setActiveIndex(
			Math.min(nextIndex, Math.ceil(totalSlides / slidesToScroll) - 1),
		);
	};

	const prevSlide = () => {
		const prevIndex = activeIndex - 1;
		setActiveIndex(Math.max(prevIndex, 0));
	};

	const slideWidth = 95 / slidesToShow;
	const gap = 16;

	const translateX = -activeIndex * (slideWidth + gap) * (slidesToScroll - 0.5);

	return (
		<div className="max-w-[1100px]  mx-auto w-[100%] relative overflow-hidden">
			<div
				className="flex transition-transform duration-500 ease-in-out "
				style={{ transform: `translateX(${translateX}%)` }}
				ref={carouselRef}>
				{slides.map((slide, index) => (
					<div
						key={index}
						className="flex-shrink-0 rounded-md shadow-md overflow-hidden border border-[#92929280]"
						style={{
							width: `${slideWidth}%`,
							marginRight: index !== totalSlides - 1 ? `${gap}px` : '0',
						}}>
						{slide}
					</div>
				))}
			</div>

			<div className="flex items-center mt-3">
				<button
					disabled={activeIndex === 0}
					className="disabled:text-[#626262]"
					onClick={prevSlide}>
					<Icon icon="iconamoon:arrow-up-2-bold" rotate={3} fontSize={33} />
				</button>
				<button
					disabled={activeIndex === Math.ceil(totalSlides / slidesToScroll) - 1}
					className="disabled:text-[#626262]"
					onClick={nextSlide}>
					<Icon icon="iconamoon:arrow-up-2-bold" rotate={1} fontSize={33} />
				</button>
			</div>
		</div>
	);
};

export default Carousel;
