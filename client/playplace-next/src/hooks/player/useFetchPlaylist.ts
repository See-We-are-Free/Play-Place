import { useRecoilState } from 'recoil';
import { basicSongsState, landmarkGroupsState } from '@/recoil/playlist';
import { getPlaylistApi } from '@/utils/api/playlists';
import { playQueueState } from '@/recoil/play';
import { LandmarkGroup } from '@/types/play';

function useFetchPlaylist() {
	const [basicSongs, setBasicSongs] = useRecoilState(basicSongsState);
	const [landmarkGroups, setLandmarkGroups] = useRecoilState(landmarkGroupsState);
	const [, setPlayQueue] = useRecoilState(playQueueState);

	const fetchData = async () => {
		try {
			const response = await getPlaylistApi();
			if (response.status === 200) {
				setBasicSongs(response.data.basicSongs);
				setLandmarkGroups(response.data.landmarks);

				// 랜드마크 그룹이 포함되어 있으면,
				const queue = [...response.data.basicSongs];
				if (response.data.landmarks.length) {
					response.data.landmarks.forEach((el: LandmarkGroup) => {
						queue.push(...el.landmarkSongs);
					});
				}
				setPlayQueue(queue);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return { basicSongs, landmarkGroups, fetchData };
}

export default useFetchPlaylist;
