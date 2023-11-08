import http from './http';

export const getSongShareInfo = async () => {
	const response = await http.get('/radar/active');
	return response;
};

export const setSongShareState = () => {
	const response = http.patch('/radar');
	return response;
};
