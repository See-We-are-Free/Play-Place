'use client';

import React, { useState, useEffect } from 'react';
import Text from '@/components/atoms/Text/Text';
import SearchList from '@/components/molecules/search/SearchList/SearchList';
import SearchBar from '@/components/molecules/search/SearchBar/SearchBar';
import SearchTemplate from '@/components/templates/SearchTemplate/SearchTemplate';
import { searchSongApi } from '@/utils/api/songs';
import { Song } from '@/types/songs';
// import Image from 'next/image';
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

	const [center, setCenter] = useState({
		lat: 0,
		lng: 0,
	});
	useEffect(() => {
		if (window.AndMap) {
			window.AndMap.successLocate();
		}

		if (window.AndCamera) {
			window.AndCamera.successCamera();
		}
	}, []);
	const cameraButton = () => {
		window.AndCamera.openCamera();
	};

	const cameraResponse = window.AndCamera.sendData();

	const [imgSrc, setImageSrc] = useState<string>('');

	function receiveImageData(encodedImageData: string) {
		// encodedImageData를 사용하는 로직이 여기에 들어갑니다.
		// 예를 들어, 이미지를 페이지에 표시할 수 있습니다.
		// const img = new Image();
		// img.src = `data:image/png;base64,${encodedImageData}`;
		setImageSrc(`data:image/png;base64,${encodedImageData}`);
	}

	useEffect(() => {
		if (cameraResponse) {
			receiveImageData(cameraResponse);
		}
	}, [cameraResponse]);

	const test = () => {
		const response = window.AndMap.getLastKnownLocation();
		if (response !== '위치를 찾을 수 없습니다') {
			const presentLocate: string[] = response.split(',');
			setCenter({
				lat: parseFloat(presentLocate[0]),
				lng: parseFloat(presentLocate[1]),
			});
		}
	};
	return (
		<SearchTemplate>
			<SearchBar handleSearch={() => handleSearch(text)} text={text} setText={setText} />
			<SearchSongsList>
				<SearSongTitle>
					<Text text="곡 검색 결과" color="gradientMain" fontSize={16} />
				</SearSongTitle>
				<button type="button" onClick={test}>
					이건 테스트야
				</button>
				<p>
					{center.lat}, {center.lng}
				</p>
				<button type="button" onClick={cameraButton}>
					이건 카메라버튼이야
				</button>
				<p>{imgSrc}</p>
				{getSong && <SearchList searchList={getSong} landMarkId={landmarkId} closeSearch={closeSearch} />}
			</SearchSongsList>
		</SearchTemplate>
	);
}

export default SearchSongs;
