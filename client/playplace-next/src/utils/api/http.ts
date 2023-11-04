import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_DEVELOP_URL;
const authLocalURL = process.env.NEXT_PUBLIC_DEVELOP_URL;
const youtubeURL = process.env.NEXT_PUBLIC_YOUTUBE_URL;

const http = axios.create({
	baseURL,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	},
});

// Axios 요청시 인터셉트
http.interceptors.request.use((req) => {
	const accessToken = localStorage.getItem('accessToken');
	if (accessToken) {
		req.headers.authorization = accessToken;
	}
	return req;
});

export const localHttp = axios.create({
	baseURL: authLocalURL,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	},
});

// Axios 요청시 인터셉트
localHttp.interceptors.request.use((req) => {
	const accessToken = localStorage.getItem('accessToken');
	if (accessToken) {
		req.headers.authorization = accessToken;
	}
	return req;
});

export const youtubleHttp = axios.create({
	baseURL: youtubeURL,
});

export default http;
