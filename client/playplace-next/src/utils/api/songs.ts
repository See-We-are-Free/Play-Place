import {
	SaveNowPlaySongApiBody,
	SaveSongLikeToggleApiBody,
	SaveSongRecordApiBody,
	SaveSongToPlaylistApiBody,
} from '@/types/api';
import http, { localHttp } from './http';

/**
 * 가장 최근에 재생한 노래 정보
 */
export const getLatestSongApi = () => {
	const response = http.get('/songs');
	return response;
};

/**
 * 내 재생목록에 음악 추가
 */
export const saveSongToPlaylistApi = (body: SaveSongToPlaylistApiBody) => {
	const response = http.post('/songs', body);
	return response;
};

/**
 * 현재 재생중인 기록하기 (1분이상 들었을 때)
 */
export const saveSongRecordApi = (body: SaveSongRecordApiBody) => {
	const response = http.post('/songs/history', body);
	return response;
};

/**
 * 노래 재생 시 호출하기
 */
export const saveNowPlaySongApi = (body: SaveNowPlaySongApiBody) => {
	const response = http.post('/songs/play', body);
	return response;
};

/**
 * 좋아요 여부 조회하기
 */
export const getSongLike = (songId: number) => {
	const response = http.get(`/songs/like/${songId}`);
	return response;
};

/**
 * 좋아요 / 좋아요 취소
 */
export const saveSongLikeToggleApi = (body: SaveSongLikeToggleApiBody) => {
	const response = http.post('/songs/like', body);
	return response;
};

export const searchSongApi = (searchWord: string) => {
	// 개발용
	const response = localHttp.get(`/songs/search/${searchWord}`);
	// const response = http.get(`/search/${searchWord}`);
	return response;
};
