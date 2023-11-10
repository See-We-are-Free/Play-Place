import GroupSongListItem from '@/components/molecules/player/GroupSongListItem/GroupSongListItem';
import { Song } from '@/types/songs';
import { getLikeSongApi } from '@/utils/api/auth';
import React, { useEffect, useState } from 'react';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import { ContentLayoutSizes } from '@/types/styles.d';
import MypageLikeItemsContainer from './style';

function MypageLike() {
	const [likeSong, setLikeSong] = useState<Song[]>([]);

	const getLikeSong = async () => {
		try {
			const response = await getLikeSongApi();
			console.log(response);

			if (response.status === 200) {
				setLikeSong(response.data.data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getLikeSong();
	}, []);

	return (
		<div>
			{likeSong.map((s) => (
				<ContentLayout $margin="10px 0px" size={ContentLayoutSizes.sm} key={s.songId}>
					<MypageLikeItemsContainer>
						<GroupSongListItem song={s} key={s.songId} />
					</MypageLikeItemsContainer>
				</ContentLayout>
			))}
		</div>
	);
}

export default MypageLike;
