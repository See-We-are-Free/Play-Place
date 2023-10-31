import React, { useState } from 'react';
import Search from '@root/public/assets/icons/Search.svg';
import { SearchSong } from '@/types/songs.d';
import getSearchSongApi from '@/utils/api/search';
import SearchBarContainer, { SearchBarButton, SearchBarInput } from './style';

function SearchBar() {
	const [text, setText] = useState<string>('');
	const [songList, setSongList] = useState<SearchSong[]>([]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setText(event.target.value);
	};

	const handleSearch = async (searchText: string) => {
		const response = await getSearchSongApi(searchText);
		console.log(response.data.items);
		setSongList(response.data.items);
		console.log(songList);
	};

	return (
		<SearchBarContainer>
			<SearchBarInput type="text" placeholder="검색어를 입력하세요" onChange={handleInputChange} />
			<SearchBarButton type="button" onClick={() => handleSearch(text)}>
				<Search />
			</SearchBarButton>
		</SearchBarContainer>
	);
}

export default SearchBar;
