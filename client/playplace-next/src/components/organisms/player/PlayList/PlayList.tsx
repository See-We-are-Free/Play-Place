import PlayListHeader from '@/components/molecules/player/PlayListHeader/PlayListHeader';
import { useEffect } from 'react';
import { getPlaylistApi } from '@/utils/api/playlist';
import { useRecoilState } from 'recoil';
import { basicSongsState, landmarkGroupsState } from '@/recoil/playlist';
import { LandmarkGroup } from '@/types/play';
import Text from '@/components/atoms/Text/Text';
import PlayListContainer from './style';
import SongGroup from '../SongGroup/SongGroup';
import SongGroupAreaHeader from '../SongGroupAreaHeader/SongGroupAreaHeader';

function PlayList() {
	const [basicSongs, setBasicSongs] = useRecoilState(basicSongsState);
	const [landmarkGroups, setLandmarkGroups] = useRecoilState(landmarkGroupsState);

	const fetchData = async () => {
		try {
			const response = await getPlaylistApi();
			if (response.status === 200) {
				setBasicSongs(response.data.basicSongs);
				setLandmarkGroups(response.data.landmarks);
			}
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<PlayListContainer>
			<PlayListHeader />
			<div id="basic-song-group">
				<SongGroupAreaHeader groupAreaName="기본 그룹" />
				<SongGroup groupName="기본" songs={basicSongs} isBasicGroup />
			</div>
			<div id="landmark-song-groups">
				<SongGroupAreaHeader groupAreaName="랜드마크 그룹" />
				{/* TODO : 랜드마크 만큼 map 돌리기 */}
				{landmarkGroups.length ? (
					landmarkGroups.map((l: LandmarkGroup) => (
						<SongGroup key={l.landmarkId} groupName={l.title} songs={l.landmarkSongs} />
					))
				) : (
					// TODO : 더 이쁘게 바꾸기
					<>
						<Text text="플레이맵에서 랜드마크 그룹을 추가하세요!" color="gray" fontSize={14} />
						<button type="button">
							<Text text="플레이맵 바로가기 >" />
						</button>
					</>
				)}
			</div>
		</PlayListContainer>
	);
}

export default PlayList;
