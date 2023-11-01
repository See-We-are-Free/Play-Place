'use client';

import React, { useState } from 'react';
import Text from '@/components/atoms/Text/Text';
import SearchList from '@/components/molecules/search/SearchList/SearchList';
import SearchBar from '@/components/molecules/search/SearchBar/SearchBar';
import { SearchSong } from '@/types/songs';
import getSearchSongApi from '@/utils/api/search';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import { ContentLayoutSizes } from '@/types/styles.d';
import SearchSongsContainer, { SearSongTitle, SearchSongsList } from './style';

function SearchSongs() {
	const [text, setText] = useState<string>('');
	const [getSong, setGetSong] = useState<SearchSong[]>([]);

	const handleSearch = async (searchText: string) => {
		const response = await getSearchSongApi(searchText);
		console.log(response.data.items);
		setGetSong(response.data.items);
	};

	return (
		<SearchSongsContainer>
			<ContentLayout size={ContentLayoutSizes.lg} $margin="10px 0px 20px 0px">
				<SearchBar handleSearch={() => handleSearch(text)} text={text} setText={setText} />
			</ContentLayout>
			<ContentLayout size={ContentLayoutSizes.sm}>
				<SearchSongsList>
					<SearSongTitle>
						<Text text="곡 검색 결과" color="gradientMain" fontSize={16} />
					</SearSongTitle>
					{getSong && <SearchList searchList={getSong} />}
				</SearchSongsList>
			</ContentLayout>
		</SearchSongsContainer>
	);
}

export default SearchSongs;
