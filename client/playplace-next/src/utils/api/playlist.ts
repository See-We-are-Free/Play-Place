import http from './http';

export const getPlaylistApi = () => {
	const response = http.get('/playlist');
	return response;
};
