import React from 'react';
import Search from '@root/public/assets/icons/Search.svg';
import SearchBarContainer, { SearchBarButton, SearchBarInput } from './style';

interface ISearchBarProps {
	text: string;
	setText: React.Dispatch<React.SetStateAction<string>>;
	handleSearch: (searchText: string) => void;
}

function SearchBar(props: ISearchBarProps) {
	const { text, setText, handleSearch } = props;

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setText(event.target.value);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSearch(text);
		}
	};

	return (
		<SearchBarContainer>
			<SearchBarInput
				type="text"
				placeholder="검색어를 입력하세요"
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
			/>
			<SearchBarButton type="button" onClick={() => handleSearch(text)}>
				<Search />
			</SearchBarButton>
		</SearchBarContainer>
	);
}

export default SearchBar;
