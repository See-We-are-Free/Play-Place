'use client';

import React, { useState } from 'react';
import Text from '@/components/atoms/Text/Text';
import SearchList from '@/components/molecules/search/SearchList/SearchList';
import SearchBar from '@/components/molecules/search/SearchBar/SearchBar';
import SearchTemplate from '@/components/templates/SearchTemplate/SearchTemplate';
import { searchSongApi } from '@/utils/api/songs';
import { Song } from '@/types/songs';
import { SearSongTitle, SearchSongsList } from './style';

function SearchSongs() {
	const [text, setText] = useState<string>('');
	const [getSong, setGetSong] = useState<Song[]>([]);

	const handleSearch = async (searchText: string) => {
		const response = await searchSongApi(searchText);
		setGetSong(response.data);
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
