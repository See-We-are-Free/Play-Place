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
	songId: number;
	youtubeId: string;
	title: string;
	artist: string;
	albumImg: string;
	playTime: number;
	villageName: string;
	villageCode: number;
}

export interface AreaSongList {
	songs: Song[];
}

export interface WeatherSongList {
	weather: string;
	songs: Song[];
}

export interface TimezoneSongList {
	timezone: string;
	songs: Song[];
}

export interface Village {
	villageName: string;
	villageCode: number;
}
