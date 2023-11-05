import { ChatLogType } from '@/types/chatbot';
import { Song } from '@/types/songs';

export const SONGS: Song[] = [
	{
		songId: 1,
		youtubeId: '6eNlsvND33w',
		title: 'Shape of You',
		artist: 'Ed Sheeran',
		albumImg:
			'https://i.ytimg.com/vi/6eNlsvND33w/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDPGYjr4enh15zF6dNm8Boz22Uvkw',
		playTime: 235,
	},
	{
		songId: 2,
		youtubeId: '7jxlsVRylq8',
		title: 'Blinding Lights',
		artist: 'The Weeknd',
		albumImg:
			'https://i.ytimg.com/vi/7jxlsVRylq8/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDP3Aq5OmrEtxdHEfA0wuCKFNk5pQ',
		playTime: 200,
	},
	{
		songId: 3,
		youtubeId: 'MRG2XF-nFxg',
		title: 'Uptown Funk',
		artist: 'Mark Ronson ft. Bruno Mars',
		albumImg:
			'https://i.ytimg.com/vi/lclm_ZTGH90/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDjdBpNxzGYRDAIMbgsFW08Jb8nOQ',
		playTime: 270,
	},
	{
		songId: 4,
		youtubeId: '3NNhrqHZqlI',
		title: 'Rolling in the Deep',
		artist: 'Adele',
		albumImg:
			'https://i.ytimg.com/vi/Ken-GauAZi4/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCRkiQH_zAYh0mV2MCY0_8fE--e-w',
		playTime: 228,
	},
	{
		songId: 5,
		youtubeId: '49cyaEDTd5I',
		title: 'Perfect',
		artist: 'Ed Sheeran',
		albumImg:
			'https://i.ytimg.com/vi/49cyaEDTd5I/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDAqO9MkjK0qOTK4DZZ7jcUgKfjRw',
		playTime: 263,
	},
	{
		songId: 6,
		youtubeId: 'Y4JQokTmBTA',
		title: 'Dance Monkey',
		artist: 'Tones and I',
		albumImg:
			'https://i.ytimg.com/vi/Y4JQokTmBTA/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBzG5h-ZgZOpoydxp89ew7y0_gc-A',
		playTime: 209,
	},
	{
		songId: 7,
		youtubeId: 'cCPKJXux50g',
		title: 'Bad Guy',
		artist: 'Billie Eilish',
		albumImg:
			'https://i.ytimg.com/vi/h3_RgaKtdFg/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDhpSWa_L7tnqQleICBDVERc2ulog',
		playTime: 194,
	},
	{
		songId: 8,
		youtubeId: 'LJrxa5kej6A',
		title: 'Thinking Out Loud',
		artist: 'Ed Sheeran',
		albumImg:
			'https://i.ytimg.com/vi/LJrxa5kej6A/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCT_K9iY5sEm27rPlk1_N-bMXj6bA',
		playTime: 265,
	},
	{
		songId: 9,
		youtubeId: '1HfsK4rzr5s',
		title: 'Despacito',
		artist: 'Luis Fonsi ft. Daddy Yankee',
		albumImg:
			'https://i.ytimg.com/vi/1HfsK4rzr5s/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLC0Ea1u0_wqNBKTI36_y7HQZ1Zklg',
		playTime: 228,
	},
	{
		songId: 10,
		youtubeId: 'mvwxvkkqX8',
		title: 'All of Me',
		artist: 'John Legend',
		albumImg:
			'https://i.ytimg.com/vi/-mvwxvkkqX8/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLD4kDUN53cHRK2cW4v13uV1RqgsTg',
		playTime: 269,
	},
];
export const landmarks = [];

export const dummyChatLogs: ChatLogType[] = [
	{
		id: 1,
		date: '2023-01-23',
		picture: 'https://i.ytimg.com/vi/tBjUhDXxpRs/hqdefault.jpg',
		resultText: '아름다운 도시네요.',
		resultSongs: SONGS,
	},
	{
		id: 2,
		date: '2023-01-23',
		picture: 'https://i.ytimg.com/vi/tBjUhDXxpRs/hqdefault.jpg',
		resultText: '아름다운 도시네요.',
		resultSongs: SONGS,
	},
	{
		id: 3,
		date: '2023-01-23',
		picture: 'https://i.ytimg.com/vi/tBjUhDXxpRs/hqdefault.jpg',
		resultText: '아름다운 도시네요.',
		resultSongs: SONGS,
	},
	{
		id: 4,
		date: '2023-01-23',
		picture: 'https://i.ytimg.com/vi/tBjUhDXxpRs/hqdefault.jpg',
		resultText: '아름다운 도시네요.',
		resultSongs: SONGS,
	},
	{
		id: 5,
		date: '2023-01-23',
		picture: 'https://i.ytimg.com/vi/tBjUhDXxpRs/hqdefault.jpg',
		resultText: '아름다운 도시네요.',
		resultSongs: SONGS,
	},
];
