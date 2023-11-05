import http, { localHttp } from './http';

const getLandmarksApi = () => {
	const response = http.get('/landmarks');
	return response;
};

export const getDevelopLandmarksApi = () => {
	const response = localHttp.get('/landmarks');
	return response;
};

export const getLandmarkDetailApi = (landMarkId: number) => {
	const response = http.get(`/landmarks/${landMarkId}`);
	return response;
};

export const getDevelopLandmarkDetailApi = (landMarkId: number) => {
	const response = localHttp.get(`/landmarks/${landMarkId}`);
	return response;
};

export default getLandmarksApi;
