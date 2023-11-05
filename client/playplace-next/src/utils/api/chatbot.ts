import http from './http';

export const getChatLogsApi = async () => {
	const response = await http.get('/chatbot');
	return response;
};

// TODO : 임시 api
export const getRecommendResultApi = async () => {
	const response = await http.post('/chatbot/recommend');
	return response;
};
