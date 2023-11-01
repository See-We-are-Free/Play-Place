export interface Song {
	songId: number;
	youtubeId: string;
	title: string;
	artist: string;
	albumImg: string;
	playTime: number;
}

export interface SearchSong {
	kind: string;
	etag: string;
	id: SongId;
	snippet: {
		publishedAt: string;
		channelId: string;
		channelTitle: string;
		title: string;
		description: string;
		thumbnails: {
			default: SongThumbnails;
			medium: SongThumbnails;
			high: SongThumbnails;
		};
	};
}

interface SongId {
	kind: string;
	videoId: string;
}

interface SongThumbnails {
	url: string;
	width: number;
	height: number;
}
