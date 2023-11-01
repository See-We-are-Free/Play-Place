'use client';

import React, { useEffect, useState } from 'react';
import Text from '@/components/atoms/Text/Text';
import SearchList from '@/components/molecules/search/SearchList/SearchList';
import SearchBar from '@/components/molecules/search/SearchBar/SearchBar';
import { SearchSong, SearchSongItems } from '@/types/songs';
import getSearchSongApi from '@/utils/api/search';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import { ContentLayoutSizes } from '@/types/styles.d';
import SearchSongsContainer, { SearSongTitle, SearchSongsList } from './style';

function SearchSongs() {
	const [text, setText] = useState<string>('');
	const [getSong, setGetSong] = useState<SearchSong[]>([]);
	const [songList, setSongList] = useState<SearchSongItems[]>([]);

	const handleSearch = async (searchText: string) => {
		const response = await getSearchSongApi(searchText);
		console.log(response.data.items);
		setGetSong(response.data.items);

		if (songList) {
			setSongList([]);
		}
	};

	useEffect(() => {
		if (getSong.length > 0) {
			getSong.forEach((item) => {
				const artist = item.snippet.channelTitle.split('-');
				songList.push({
					thumbnail: item.snippet.thumbnails.high.url,
					title: item.snippet.title,
					artist: artist[0],
					videoId: item.id.videoId,
				});
			});

			console.log(songList);
		}
	}, [getSong, songList]);

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
					{songList && <SearchList searchList={songList} />}
				</SearchSongsList>
			</ContentLayout>
		</SearchSongsContainer>
	);
}

export default SearchSongs;
