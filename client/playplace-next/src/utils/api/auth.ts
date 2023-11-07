import { JoinApiParams } from '@/types/auth';
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
