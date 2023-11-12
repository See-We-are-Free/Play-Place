import React, { useState, useEffect } from 'react';
import SongCircleList from '@/components/organisms/song/SongCircleList/SongCircleList';
import SongSquareList from '@/components/organisms/song/SongSquareList/SongSquareList';
import SongRectList from '@/components/organisms/song/SongRectList/SongRectList';
import HomeTemplate from '@/components/templates/HomeTemplate/HomeTemplate';
import { postLocateSongsApi, postTimezoneSongApi, postVillageApi, postWeatherSongApi } from '@/utils/api/songs';
import { AreaSongList, TimezoneSongList, Village, WeatherSongList } from '@/types/songs';
import { ILocation } from '@/types/maps';

interface IHomeProps {
	setVillage: React.Dispatch<React.SetStateAction<Village>>;
}

function Home(props: IHomeProps) {
	const { setVillage } = props;

	const [present, setPresent] = useState<ILocation>({
		lat: 0,
		lng: 0,
	});

	const [locateData, setLocateData] = useState<AreaSongList>({
		songs: [],
	});
	const [weatehrData, setWeatherData] = useState<WeatherSongList>({
		weather: 'SUN',
		songs: [],
	});
	const [timeData, setTimeData] = useState<TimezoneSongList>({
		timezone: 'DAWN',
		songs: [],
	});

	const getLocate = async () => {
		try {
			const response = await postLocateSongsApi(present);
			if (response.status === 200) {
				console.log(response.data);
				setLocateData(response.data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getWeather = async () => {
		try {
			const response = await postWeatherSongApi(present);
			if (response.status === 200) {
				console.log(response.data);
				setWeatherData(response.data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getTime = async () => {
		try {
			const response = await postTimezoneSongApi();

			if (response.status === 200) {
				console.log(response.data);
				setTimeData(response.data);
				console.log(timeData);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getVillage = async () => {
		try {
			const response = await postVillageApi(present);
			if (response.status === 200) {
				console.log(response.data);
				setVillage(response.data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (window && window.AndMap) {
			const location: { lat: number; lng: number } = JSON.parse(window.AndMap.getLastKnownLocation());
			setPresent(location);
		}
		getVillage();
		getLocate();
		getWeather();
		getTime();
	}, []);

	return (
		<HomeTemplate>
			<SongCircleList locationSongList={locateData} />
			<SongSquareList weatherSongList={weatehrData} />
			<SongRectList timeZoneSongList={timeData} />
		</HomeTemplate>
	);
}

export default Home;
