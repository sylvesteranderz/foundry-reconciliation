import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const animationVariants = {
	initial: {
		opacity: 0,
		y: 100,
	},
	animate: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: 0.08 * i },
	}),
};


type SetStateAction<T> = (value: React.SetStateAction<T>) => void;

export const updateArrayElement = <T>(
	index: number,
	value: T,
	setArray: SetStateAction<T[]>,
) => {
	setArray((prevArray) => {
		const newArray = [...prevArray];
		newArray[index] = value;
		return newArray;
	});
};

export const calculateSubtotal = (item: any, count: number) => {
	const pricePerKg = item.price_list_rate;

	return count * pricePerKg;
};
