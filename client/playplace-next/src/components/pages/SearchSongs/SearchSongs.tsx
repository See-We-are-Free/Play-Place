'use client';

import React, { useState } from 'react';
import Text from '@/components/atoms/Text/Text';
import SearchList from '@/components/molecules/search/SearchList/SearchList';
import SearchBar from '@/components/molecules/search/SearchBar/SearchBar';
import SearchTemplate from '@/components/templates/SearchTemplate/SearchTemplate';
import { searchSongApi } from '@/utils/api/songs';
import { Song } from '@/types/songs';
import { SearSongTitle, SearchSongsList } from './style';

interface ISearchSongsprops {
	landmarkId?: number;
	closeSearch?: () => void;
}
function SearchSongs(props: ISearchSongsprops) {
	const { landmarkId, closeSearch } = props;
	const [text, setText] = useState<string>('');
	const [getSong, setGetSong] = useState<Song[]>([]);

	const handleSearch = async (searchText: string) => {
		const response = await searchSongApi(searchText);
		setGetSong(response.data);
	};

	// const cameraButton = () => {
	// 	window.AndCamera.openCamera();
	// };

	// const cameraResponse = window.AndCamera.sendData();

	// const [imgSrc, setImageSrc] = useState<string>('');

	// function receiveImageData(encodedImageData: string) {
	// 	setImageSrc(`data:image/png;base64,${encodedImageData}`);
	// }

	// useEffect(() => {
	// 	if (cameraResponse) {
	// 		receiveImageData(cameraResponse);
	// 	}
	// }, [cameraResponse]);

	return (
		<SearchTemplate>
			<SearchBar handleSearch={() => handleSearch(text)} text={text} setText={setText} />
			<SearchSongsList>
				<SearSongTitle>
					<Text text="곡 검색 결과" color="gradientMain" fontSize={16} />
				</SearSongTitle>
				{/* <button type="button" onClick={cameraButton}>
					이건 카메라버튼이야
				</button>
				<p>{imgSrc}</p> */}
				{getSong && <SearchList searchList={getSong} landMarkId={landmarkId} closeSearch={closeSearch} />}
			</SearchSongsList>
		</SearchTemplate>
	);
}

export default SearchSongs;
