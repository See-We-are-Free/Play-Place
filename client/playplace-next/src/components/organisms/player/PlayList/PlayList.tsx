import PlayListHeader from '@/components/molecules/player/PlayListHeader/PlayListHeader';
import { useEffect } from 'react';
import { getPlaylistApi } from '@/utils/api/playlist';
import PlayListContainer from './style';
import SongGroup from '../SongGroup/SongGroup';
import SongGroupAreaHeader from '../SongGroupAreaHeader/SongGroupAreaHeader';

function PlayList() {
	const fetchData = async () => {
		try {
			const response = await getPlaylistApi();
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
				<SongGroup groupName="기본" />
			</div>
			<div id="landmark-song-groups">
				<SongGroupAreaHeader groupAreaName="랜드마크 그룹" />
				{/* TODO : 랜드마크 만큼 map 돌리기 */}
				<SongGroup groupName="해운대" />
			</div>
		</PlayListContainer>
	);
}

export default PlayList;
