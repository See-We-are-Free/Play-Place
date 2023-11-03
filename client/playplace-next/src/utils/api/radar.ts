import http, { localHttp } from './http';

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

export const getAroundPeople = (longitude: string, latitude: string) => {
	const response = http.get(`/radar?longitude=${longitude}&latitude=${latitude}`);
	return response;
};

export const developGetAroundPeople = () => {
	const response = localHttp.get(`/radar?longitude=126.823162&latitude=35.191378`);
	// const response = localHttp.get(`/radar?longitude=${longitude}&latitude=${latitude}`);
	return response;
};
