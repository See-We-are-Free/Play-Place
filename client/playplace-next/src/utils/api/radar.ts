import http from './http';

export const getSongShareInfoApi = async () => {
	const response = await http.get('/radar/activate');
	return response;
};

export const setSongShareStateApi = () => {
	const response = http.patch('/radar');
	return response;
};
