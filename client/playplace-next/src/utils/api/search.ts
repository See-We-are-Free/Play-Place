import { youtubleHttp } from './http';

const youtubeKey = process.env.NEXT_PUBLIC_YOUTUBE_KEY;

const getSearchSongApi = (songName: string) => {
	const response = youtubleHttp.get('/search', {
		params: {
			part: 'id,snippet',
			q: `${songName} topic auto-generated`,
			key: `${youtubeKey}`,
			type: 'video',
			videoCategoryId: 10,
		},
	});

	return response;
};

export default getSearchSongApi;
