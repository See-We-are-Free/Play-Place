import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
const authLocalURL = process.env.NEXT_PUBLIC_DEVELOP_URL;

const http = axios.create({
	baseURL,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	},
});

export const localHttp = axios.create({
	baseURL: authLocalURL,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	},
});

export default http;
