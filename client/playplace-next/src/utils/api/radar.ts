import http from './http';

export const getSongShareInfo = async () => {
	// const response = await http.get('/radar');
	// return response;
	return false; // 임시
};

export const setSongShareState = () => {
	const response = http.patch('/radar');
	return response;
};
