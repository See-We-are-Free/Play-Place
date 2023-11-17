import { AreaSong, Song, TimezoneSong, WeatherSong } from './songs';

const SONG_DATA: Song[] = [
	{
		songId: 0,
		youtubeId: '1A',
		title: 'HypeBoy',
		artist: 'NewJeans',
		albumImg: '',
		playTime: 200,
	},
	{
		songId: 1,
		youtubeId: '1B',
		title: 'HypeBoy',
		artist: 'NewJeans',
		albumImg: '',
		playTime: 200,
	},
	{
		songId: 2,
		youtubeId: '1C',
		title: 'HypeBoy',
		artist: 'NewJeans',
		albumImg: '',
		playTime: 200,
	},
	{
		songId: 3,
		youtubeId: '1D',
		title: 'HypeBoy',
		artist: 'NewJeans',
		albumImg: '',
		playTime: 200,
	},
	{
		songId: 4,
		youtubeId: '1E',
		title: 'HypeBoy',
		artist: 'NewJeans',
		albumImg: '',
		playTime: 200,
	},
	{
		songId: 5,
		youtubeId: '1F',
		title: 'HypeBoy',
		artist: 'NewJeans',
		albumImg: '',
		playTime: 200,
	},
	{
		songId: 6,
		youtubeId: '1G',
		title: 'HypeBoy',
		artist: 'NewJeans',
		albumImg: '',
		playTime: 200,
	},
];

export const LOCATE_DATA: AreaSong = {
	villageName: '장덕동',
	villageCode: 1234,
	songs: SONG_DATA,
};

export const WEATHER_DATA: WeatherSong = {
	weather: 'SUN',
	songs: SONG_DATA,
};

export const TIME_DATA: TimezoneSong = {
	timezone: 'MORNING',
	songs: SONG_DATA,
};

export default SONG_DATA;
