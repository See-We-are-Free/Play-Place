import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { basicSongsState, landmarkGroupsState } from '@/recoil/playlist';
import { getPlaylistApi } from '@/utils/api/playlist';

function useFetchPlaylist() {
	const [basicSongs, setBasicSongs] = useRecoilState(basicSongsState);
	const [landmarkGroups, setLandmarkGroups] = useRecoilState(landmarkGroupsState);

	const fetchData = async () => {
		try {
			const response = await getPlaylistApi();
			if (response.status === 200) {
				setBasicSongs(response.data.basicSongs);
				setLandmarkGroups(response.data.landmarks);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return { basicSongs, landmarkGroups, fetchData };
}

export default useFetchPlaylist;
