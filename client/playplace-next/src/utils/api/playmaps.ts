import { localHttp } from './http';

const getLandmarksApi = () => {
	const response = localHttp.get('/landmarks');
	return response;
};

export default getLandmarksApi;
