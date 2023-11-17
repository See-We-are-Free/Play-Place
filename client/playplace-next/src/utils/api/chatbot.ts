import { GetRecommendResultApiBody } from '@/types/chatbot';
import http from './http';

const chatbotHeader = {
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'multipart/form-data',
	},
};

export const getChatLogsApi = async () => {
	const response = await http.get('/chatbots');
	return response;
};

export const getRecommendResultApi = async (body: GetRecommendResultApiBody) => {
	const response = await http.post('/chatbots', body, chatbotHeader);
	return response;
};
