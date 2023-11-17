import React, { useState, useEffect, useContext } from 'react';
import SongCircleList from '@/components/organisms/song/SongCircleList/SongCircleList';
import SongSquareList from '@/components/organisms/song/SongSquareList/SongSquareList';
import SongRectList from '@/components/organisms/song/SongRectList/SongRectList';
import HomeTemplate from '@/components/templates/HomeTemplate/HomeTemplate';
import { postLocateSongsApi, postTimezoneSongApi, postVillageApi, postWeatherSongApi } from '@/utils/api/songs';
import { AreaSongList, TimezoneSongList, Village, WeatherSongList } from '@/types/songs';
import { HomeApiBody } from '@/types/api';
import UserInfoContext from '@/utils/common/UserInfoContext';

interface IHomeProps {
	setVillage: React.Dispatch<React.SetStateAction<Village>>;
}

function Home(props: IHomeProps) {
	const { getLocation } = useContext(UserInfoContext);
	const { setVillage } = props;
	const [present, setPresent] = useState<HomeApiBody | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

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
				setTimeData(response.data);
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
				setVillage(response.data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const location = getLocation();
		if (location) {
			setPresent({ lat: location.lat, lon: location.lng });
		}
	}, []);

	useEffect(() => {
		if (isLoading && present) {
			getVillage();
			getLocate();
			getWeather();
			getTime();
			setIsLoading(false);
		}
	}, [present]);

	return (
		<>
			{!isLoading && (
				<HomeTemplate>
					<SongCircleList locationSongList={locateData} />
					<SongSquareList weatherSongList={weatehrData} />
					<SongRectList timeZoneSongList={timeData} />
				</HomeTemplate>
			)}
		</>
	);
}

export default Home;
