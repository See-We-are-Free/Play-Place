import http, { localHttp } from './http';

export const getPlaylistApi = () => {
	const response = localHttp.get('/playlists');
	return response;
};

// 임시
export const getSongsApi = () => {
	const response = http.get('/songs');
	return response;
};
