'use client';

import React, { useState } from 'react';
import Text from '@/components/atoms/Text/Text';
import SearchList from '@/components/molecules/search/SearchList/SearchList';
import SearchBar from '@/components/molecules/search/SearchBar/SearchBar';
import { SearchSong } from '@/types/songs';
import getSearchSongApi from '@/utils/api/search';
import SearchTemplate from '@/components/templates/SearchTemplate/SearchTemplate';
import { SearSongTitle, SearchSongsList } from './style';

function SearchSongs() {
	const [text, setText] = useState<string>('');
	const [getSong, setGetSong] = useState<SearchSong[]>([]);

	const handleSearch = async (searchText: string) => {
		const response = await getSearchSongApi(searchText);
		console.log(response.data.items);
		setGetSong(response.data.items);
	};

	return (
		<SearchTemplate>
			<SearchBar handleSearch={() => handleSearch(text)} text={text} setText={setText} />
			<SearchSongsList>
				<SearSongTitle>
					<Text text="곡 검색 결과" color="gradientMain" fontSize={16} />
				</SearSongTitle>
				{getSong && <SearchList searchList={getSong} />}
			</SearchSongsList>
		</SearchTemplate>
	);
}

export default SearchSongs;
