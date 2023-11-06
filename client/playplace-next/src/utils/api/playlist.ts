import http, { localHttp } from './http';

export const getPlaylistApi = () => {
	const response = localHttp.get('/playlists');
	return response;
};

// 재생목록의 곡 삭제
export const deleteSongFromPlayListApi = (isLandmark: boolean, songId: number) => {
	const response = http.delete(`/playlists/${isLandmark}/${songId}`);
	return response;
};

// 재생목록에서 그룹삭제
export const deleteGroupFromPlayListApi = (groupId: number) => {
	const response = http.delete(`/playlists/group/${groupId}`);
	return response;
};
