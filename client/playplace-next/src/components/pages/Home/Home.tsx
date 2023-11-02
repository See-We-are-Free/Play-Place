import React, { useState } from 'react';
import SongCircleList from '@/components/organisms/song/SongCircleList/SongCircleList';
import SongSquareList from '@/components/organisms/song/SongSquareList/SongSquareList';
import SongRectList from '@/components/organisms/song/SongRectList/SongRectList';
import { LOCATE_DATA, TIME_DATA, WEATHER_DATA } from '@/types/home.d';
import HomeTemplate from '@/components/templates/HomeTemplate/HomeTemplate';

function Home() {
	const [locateData] = useState(LOCATE_DATA);
	const [weatehrData] = useState(WEATHER_DATA);
	const [timeData] = useState(TIME_DATA);

	return (
		<HomeTemplate>
			<SongCircleList locationSongList={locateData} />
			<SongSquareList WeatherSongList={weatehrData} />
			<SongRectList TimeZoneSongList={timeData} />
		</HomeTemplate>
	);
}

export default Home;
