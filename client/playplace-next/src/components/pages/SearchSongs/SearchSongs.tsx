/* eslint-disable no-nested-ternary */

'use client';

import React, { useState } from 'react';
import Text from '@/components/atoms/Text/Text';
import SearchList from '@/components/molecules/search/SearchList/SearchList';
import SearchBar from '@/components/molecules/search/SearchBar/SearchBar';
import SearchTemplate from '@/components/templates/SearchTemplate/SearchTemplate';
import { searchSongApi } from '@/utils/api/songs';
import { Song } from '@/types/songs';
import CustomToast from '@/components/atoms/CustomToast/CustomToast';
import { ToastStyles } from '@/types/styles.d';
import { SearSongTitle, SearchSongsList } from './style';

interface ISearchSongsprops {
	landmarkId?: number;
	closeSearch?: () => void;
}
function SearchSongs(props: ISearchSongsprops) {
	const { landmarkId, closeSearch } = props;
	const [text, setText] = useState<string>('');
	const [getSong, setGetSong] = useState<Song[]>([]);
	const [isLanding, setIsLanding] = useState(true);

	const handleSearch = async (searchText: string) => {
		try {
			const response = await searchSongApi(searchText);
			if (response.status === 200) {
				setIsLanding(false);
				setGetSong(response.data);
			}
		} catch (error) {
			if (landmarkId) {
				CustomToast(ToastStyles.noTabbarError, `음악 검색에 실패했습니다. 잠시 후 다시 시도하세요.`);
			} else {
				CustomToast(ToastStyles.error, `음악 검색에 실패했습니다. 잠시 후 다시 시도하세요.`);
			}
		}
	};

	return (
		<SearchTemplate>
			<SearchBar handleSearch={() => handleSearch(text)} text={text} setText={setText} />
			<SearchSongsList>
				<SearSongTitle>
					{isLanding ? (
						<>
							<Text text="음악 제목 또는 아티스트 명으로 검색하세요." color="gray" fontSize={14} />
						</>
					) : getSong.length ? (
						<Text text="곡 검색 결과" color="gradientMain" fontSize={16} />
					) : (
						<Text text="검색결과가 없습니다." color="gray" fontSize={14} />
					)}
				</SearSongTitle>
				{getSong && <SearchList searchList={getSong} landMarkId={landmarkId} closeSearch={closeSearch} />}
			</SearchSongsList>
		</SearchTemplate>
	);
}

export default SearchSongs;
