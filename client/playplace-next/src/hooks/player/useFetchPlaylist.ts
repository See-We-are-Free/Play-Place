import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { basicSongsState, landmarkGroupsState } from '@/recoil/playlist';
import { getPlaylistApi } from '@/utils/api/playlist';
import { playQueueState } from '@/recoil/play';

function useFetchPlaylist() {
	const [basicSongs, setBasicSongs] = useRecoilState(basicSongsState);
	const [landmarkGroups, setLandmarkGroups] = useRecoilState(landmarkGroupsState);
	const [playqueue, setPlayQueue] = useRecoilState(playQueueState);

	const fetchData = async () => {
		try {
			const response = await getPlaylistApi();
			if (response.status === 200) {
				setBasicSongs(response.data.basicSongs);
				setLandmarkGroups(response.data.landmarks);
				setPlayQueue([...response.data.basicSongs, ...response.data.landmarks]);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		console.log(playqueue);
	}, [playqueue]);

	return { basicSongs, landmarkGroups, fetchData };
}

export default useFetchPlaylist;
