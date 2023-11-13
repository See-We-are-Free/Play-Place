import http from './http';

export const getChatLogsApi = async () => {
	const response = await http.get('/chatbots');
	return response;
};

// TODO : 임시 api
export const getRecommendResultApi = async () => {
	const response = await http.post('/chatbots/recommend');
	return response;
};
