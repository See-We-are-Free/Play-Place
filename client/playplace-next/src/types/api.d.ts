// songs
export interface SaveSongToPlaylistApiBody {
	youtubeId: string;
	title: string;
	artist: string;
	albumImg: string;
	playTime: number;
}

export interface SaveSongRecordApiBody {
	songId: number;
	lat: number;
	lon: number;
}

export interface SaveNowPlaySongApiBody {
	isLandmark: boolean;
	playlistSongId: number;
}

export interface UpdatePlayTimeApiBody {
	youtubeId: string;
	playTime: number;
}

export interface SaveSongLikeToggleApiBody {
	like: boolean;
	songId: number;
}

//
