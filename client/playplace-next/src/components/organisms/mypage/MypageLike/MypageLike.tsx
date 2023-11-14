import GroupSongListItem from '@/components/molecules/player/GroupSongListItem/GroupSongListItem';
import { Song } from '@/types/songs';
import { getLikeSongApi } from '@/utils/api/auth';
import React, { useEffect, useState } from 'react';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import { ContentLayoutSizes } from '@/types/styles.d';
import Text from '@/components/atoms/Text/Text';
import RightArrow from '@root/public/assets/icons/RightArrow.svg';
import { useRouter } from 'next/navigation';
import MypageLikeItemsContainer, { EmptyContent } from './style';

function MypageLike() {
	const router = useRouter();
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

	const handleMoveSearch = () => {
		router.push('/search');
	};

	useEffect(() => {
		getLikeSong();
	}, []);

	return (
		<div>
			{likeSong.length === 0 && (
				<ContentLayout $margin="10px auto" size={ContentLayoutSizes.sm}>
					<EmptyContent>
						<Text text="좋아요한 곡이 없어요!" fontSize={16} />
						<Text text="재생목록에서 하트 버튼을 눌러 좋아하는 음악을 추가해보세요." />
						<button type="button" onClick={handleMoveSearch}>
							<Text text="검색하러 가기" />
							<RightArrow />
						</button>
					</EmptyContent>
				</ContentLayout>
			)}
			{likeSong.map((s) => (
				<ContentLayout $margin="10px 0px" size={ContentLayoutSizes.sm} key={s.songId}>
					<MypageLikeItemsContainer>
						<GroupSongListItem song={s} key={s.songId} isSearch={false} />
					</MypageLikeItemsContainer>
				</ContentLayout>
			))}
		</div>
	);
}

export default MypageLike;
