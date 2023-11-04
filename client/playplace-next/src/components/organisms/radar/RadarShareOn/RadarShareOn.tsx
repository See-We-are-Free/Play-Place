// import RefreshIcon from '@root/public/assets/icons/Refresh.svg';
import Text from '@/components/atoms/Text/Text';
import { useState } from 'react';
import { UserInfo } from '@/types/auth';
import Image from 'next/image';
import { PROFILE_IMAGES } from '@/constants/member';
// import { developGetAroundPeople } from '@/utils/api/radar';
// import { IAroundPeople } from '@/types/radar';
import SongMarkerList from '@/components/molecules/SongMarkerList/SongMarkerList';
import { BackgroundRound, BackgroundContainer, EmojiWrapper, RadarShareOnContainer, UserContainer } from './style';

function RadarShareOn() {
	// const [people, setPeople] = useState<IAroundPeople | null>(null);
	const [user] = useState<UserInfo>({
		emojiIdx: 0,
		nickname: '임하스',
	});

	// const handleRefresh = async () => {
	// const response = await developGetAroundPeople();
	// if (response.status === 200) {
	// 	setPeople(response.data);
	// }
	// };

	// useEffect(() => {
	// 	console.log('people', people);
	// 	if (!people) {
	// 		handleRefresh();
	// 	}
	// }, [people]);

	return (
		<RadarShareOnContainer>
			{/* <button type="button" onClick={handleRefresh}>
				<RefreshIcon />
				<Text text="재탐색" />
			</button> */}

			<SongMarkerList />
			<BackgroundContainer>
				<UserContainer>
					<EmojiWrapper>
						<Image src={PROFILE_IMAGES[user.emojiIdx]} alt={`${user.nickname} 님의 프로필 이미지`} />
					</EmojiWrapper>
					<Text text={user.nickname} />
				</UserContainer>
				<BackgroundRound />
			</BackgroundContainer>
		</RadarShareOnContainer>
	);
}

export default RadarShareOn;
