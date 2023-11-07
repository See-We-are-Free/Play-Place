import axios, { AxiosError, AxiosHeaders } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
// const baseURL = process.env.NEXT_PUBLIC_DEVELOP_URL; // 개발용
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

// 리프레시 토큰 발급
http.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const status = error.response?.status;
		if (status === 401) {
			// JWT 만료 오류 처리
			const refreshResponse = await axios.post(
				`${baseURL}auth/refresh`,
				{},
				{
					headers: {
						Authorization: `${localStorage.getItem('accessToken')}`,
					},
				},
			);
			const { headers } = refreshResponse;
			if (headers instanceof AxiosHeaders) {
				const newAccessToken = headers.get('authorization');
				if (newAccessToken) {
					try {
						localStorage.setItem('accessToken', `${newAccessToken}`);

						const originalRequest = error.config;
						if (originalRequest !== undefined) {
							originalRequest.headers.authorization = `${newAccessToken}`;
							return await axios(originalRequest);
						}
					} catch (refreshError) {
						console.error('요청에 실패하였습니다.', refreshError);
					}
				}
			}

			// // Refresh Token이 없거나 요청이 실패한 경우 로그인 페이지로 리다이렉트
			// window.location.href = '/pp/login';
			localStorage.removeItem('accessToken');
		}

		return Promise.reject(error);
	},
);

export const youtubleHttp = axios.create({
	baseURL: youtubeURL,
});

export default http;
