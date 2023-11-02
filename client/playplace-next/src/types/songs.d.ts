export interface Song {
	songId: number;
	youtubeId: string;
	title: string;
	artist: string;
	albumImg: string;
	playTime: number;
}

export interface BasicSong extends Song {
	basicSongId: number;
}

export interface LandmarkSong extends Song {
	landmarkSongId: number;
}

export interface AreaSong {
	villageName: string;
	villageCode: number;
	songs: Song[];
}

export interface WeatherSong {
	weather: string;
	songs: Song[];
}

export interface TimezoneSong {
	timezone: string;
	songs: Song[];
}

export interface SearchSong {
	kind: string;
	etag: string;
	id: SearchSongId;
	snippet: {
		publishedAt: string;
		channelId: string;
		channelTitle: string;
		title: string;
		description: string;
		thumbnails: {
			default: SearchSongThumbnails;
			medium: SearchSongThumbnails;
			high: SearchSongThumbnails;
		};
	};
}

interface SearchSongId {
	kind: string;
	videoId: string;
}

interface SearchSongThumbnails {
	url: string;
	width: number;
	height: number;
}
