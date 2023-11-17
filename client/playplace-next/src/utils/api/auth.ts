import { JoinApiParams, FixInfoApiParams } from '@/types/auth';
import http from './http';

/**
 * 회원가입 API
 * @body email: oauth로 로그인한 이메일 string, nickname: 닉네임 string, profileImg: 프로필 이미지 int
 * @returns
 */
export const joinApi = ({ body }: JoinApiParams) => {
	const response = http.post('/users', body);
	return response;
};

export const getUserInfoApi = () => {
	const response = http.get('/users');
	return response;
};

export const getRefreshToken = () => {
	const response = http.get('/refresh');
	return response;
};

export const getLikeSongApi = () => {
	const response = http.get('/users/like');
	return response;
};

export const patchUserApi = ({ body }: FixInfoApiParams) => {
	const response = http.patch('/users', body);
	return response;
};

export const patchPushApi = () => {
	const response = http.patch('users/push');
	return response;
};

export const patchShakeApi = () => {
	const response = http.patch('users/shake');
	return response;
};

export const logoutUserApi = () => {
	const response = http.post('auth/logout');
	return response;
};

export const DeleteUserApi = () => {
	const response = http.delete('/users');
	return response;
};
