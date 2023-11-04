import { CurrentLocation } from '@/types/radar';
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

export const getAroundPeople = (params: CurrentLocation) => {
	const response = http.get(`/radar?longitude=${params.longitude}&latitude=${params.latitude}`);
	return response;
};

export const developGetAroundPeople = (params: CurrentLocation) => {
	const response = localHttp.get(`/radar?longitude=${params.longitude}&latitude=${params.latitude}`);
	// const response = localHttp.get(`/radar?longitude=126.823577&latitude=35.191318`); // 개발용
	// console.log('params', params);
	return response;
};
