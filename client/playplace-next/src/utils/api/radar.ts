import http from './http';

export const getSongShareInfo = async () => {
	const response = await http.get('/radar');
	return response;
};

export const setSongShareState = (share: boolean) => {
	const response = http.post('/test', share);
	return response;
};
