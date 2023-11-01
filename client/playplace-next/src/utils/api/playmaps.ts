import http, { localHttp } from './http';

const getLandmarksApi = () => {
	const response = http.get('/landmarks');
	return response;
};

export const getDevelopLandmarksApi = () => {
	const response = localHttp.get('/landmarks');
	return response;
};

export default getLandmarksApi;
