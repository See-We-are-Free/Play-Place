import { AddSongLandmarkApiBody } from '@/types/api';
import http, { localHttp } from './http';

// 랜드마크 정보 가져오기
const getLandmarksApi = () => {
	const response = http.get('/landmarks');
	return response;
};

export const getDevelopLandmarksApi = () => {
	const response = localHttp.get('/landmarks');
	return response;
};

// 랜드마크 상세정보
export const getLandmarkDetailApi = (landMarkId: number) => {
	const response = http.get(`/landmarks/${landMarkId}`);
	return response;
};

export const getDevelopLandmarkDetailApi = (landMarkId: number) => {
	const response = localHttp.get(`/landmarks/${landMarkId}`);
	return response;
};

// 랜드마크에 노래 추가
export const postLandmarkAddSong = (body: AddSongLandmarkApiBody) => {
	const response = http.post('/landmarks', body);
	return response;
};

export const postDevelopLandmarkAddSong = (body: AddSongLandmarkApiBody) => {
	const response = http.post('/landmarks', body);
	return response;
};

// 랜드마크 공유재생 목록 내 재생목록에 추가
export const addGroupToPlaylistApi = async (landmarkId: number) => {
	const response = await http.post(`/landmarks/${landmarkId}`);
	return response;
};
export default getLandmarksApi;
