import { authHttp } from './http';

export const joinApi = (param?: string) => {
	const response = authHttp.post(param || '/google');
	return response;
};

export const temp = {};
