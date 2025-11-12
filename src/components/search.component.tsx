import { useState } from 'react';
import { CustomInput } from './input.component';
import React from 'react';

interface SearchComponentProps {
	value: string;
	itemArray: string[];
	updateFieldFn: (fields: { value: string }) => void;
	label: string;
	placeholder: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
	value,
	itemArray,
	updateFieldFn,
	label,
	placeholder,
}) => {
	const [searchResults, setSearchResults] = useState<string[]>([]);

	const handleSearch = (value: string) => {
		const searchedItem = itemArray.filter((loc) =>
			loc.toLowerCase().includes(value.toLowerCase()),
		);
		setSearchResults(
			searchedItem.length === 0 ? ['No search results found'] : searchedItem,
		);
	};

	const handleIndividualItemClick = (item: string) => {
		updateFieldFn({ value: item });
		setSearchResults([]);
	};

	return (
		<div className="relative text-[14px]">
			<CustomInput
				label={label}
				placeholder={placeholder}
				type={'text'}
				onChange={(e) => {
					updateFieldFn({ value: e.target.value });
					handleSearch(e.target.value);
				}}
				value={value}
			/>
			{searchResults.length > 0 &&
			searchResults[0] !== 'No search results found' &&
			value ? (
				<div className="w-full absolute top-[4rem]  z-50 bg-[#f6f6f6] max-h-[150px] overflow-auto scrollbar-gray-medium shadow-md rounded-lg  text-[#555555]">
					{searchResults.map((res, index) => (
						<React.Fragment key={index}>
							<div
								className="flex items-center space-x-2 text-[#000000] px-3 mb-[2px] rounded-sm cursor-pointer hover:bg-[#ffbc9b7b] py-1"
								onClick={() => handleIndividualItemClick(res)}>
								<p className="text-standard cursor-pointer">{res}</p>
							</div>
						</React.Fragment>
					))}
				</div>
			) : null}
			{searchResults[0] === 'No search results found' && (
				<div className="absolute bg-white text-black border border-gray rounded-md mt-1 p-2 max-h-[300px] overflow-auto scrollbar-thin shadow-md w-full z-50">
					<p className="text-center">No search results found</p>
				</div>
			)}
		</div>
	);
};

export default SearchComponent;
