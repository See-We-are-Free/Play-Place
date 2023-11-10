import React, { useState, useEffect, useContext } from 'react';
import SongCircleList from '@/components/organisms/song/SongCircleList/SongCircleList';
import SongSquareList from '@/components/organisms/song/SongSquareList/SongSquareList';
import SongRectList from '@/components/organisms/song/SongRectList/SongRectList';
import HomeTemplate from '@/components/templates/HomeTemplate/HomeTemplate';
import { postLocateSongsApi, postTimezoneSongApi, postVillageApi, postWeatherSongApi } from '@/utils/api/songs';
import { AreaSongList, TimezoneSongList, Village, WeatherSongList } from '@/types/songs';
import { ILocation } from '@/types/maps';
import UserInfoContext from '@/utils/common/UserInfoContext';

interface IHomeProps {
	setVillage: React.Dispatch<React.SetStateAction<Village>>;
}

function Home(props: IHomeProps) {
	const { setVillage } = props;
	const { getLocation } = useContext(UserInfoContext);

	const [present, setPresent] = useState<ILocation | null>(null);

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
		if (!present) {
			return;
		}

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
		if (!present) {
			return;
		}

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
		if (!present) {
			return;
		}

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
		const location = getLocation;
		console.log('getLocation', location);
		setPresent(location);
	}, [getLocation]);

	useEffect(() => {
		if (!present) {
			return;
		}

		getVillage();
		getLocate();
		getWeather();
		getTime();
	}, [present]);

	return (
		<HomeTemplate>
			<SongCircleList locationSongList={locateData} />
			<SongSquareList weatherSongList={weatehrData} />
			<SongRectList timeZoneSongList={timeData} />
		</HomeTemplate>
	);
}

export default Home;
