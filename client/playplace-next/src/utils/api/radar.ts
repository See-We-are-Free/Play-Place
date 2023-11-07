import http from './http';

export const getSongShareInfo = async (): Promise<boolean> => {
	// const response = await localHttp.get('/radar?longitude=126.823577&latitude=35.191318');
	// console.log(response);
	// return response.data;
	// return true;
	return true;
};

export const setSongShareState = (share: boolean) => {
	const response = http.post('/test', share);
	return response;
};
