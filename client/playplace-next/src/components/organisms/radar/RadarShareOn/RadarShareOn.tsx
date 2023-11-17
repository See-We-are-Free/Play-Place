import Text from '@/components/atoms/Text/Text';
import { memo, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { PROFILE_IMAGES } from '@/constants/member';
import { IAroundPeople } from '@/types/radar';
import SongMarkerList from '@/components/molecules/SongMarkerList/SongMarkerList';
import getRandomMarkerList from '@/utils/common/randomMarkerList';
import StompClientContext from '@/utils/common/StompClientContext';
import UserInfoContext from '@/utils/common/UserInfoContext';
import { BackgroundRound, BackgroundContainer, EmojiWrapper, RadarShareOnContainer, UserContainer } from './style';
import MarkerDetailInfo from '../MarkerDetailInfo/MarkerDetailInfo';

function RadarShareOn() {
	const { user } = useContext(UserInfoContext);
	const { data } = useContext(StompClientContext);
	const [markerList, setMarkerList] = useState<IAroundPeople[] | null>(null);
	const [randomList, setRandomList] = useState<(IAroundPeople | null)[] | null>();
	const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
	const [detailItem, setDetailItem] = useState<IAroundPeople | null>(null);
	const SongMarkerListMemoized = memo(SongMarkerList);

	const handleMarkerInfoOpen = (item: IAroundPeople) => {
		setDetailItem(item);
		setIsDetailOpen(true);
	};

	useEffect(() => {
		if (data && data !== markerList) {
			setMarkerList(data);
		}
	}, [data, markerList]);

	useEffect(() => {
		if (markerList) {
			setRandomList(getRandomMarkerList(markerList));
		}
	}, [markerList]);

	return (
		<>
			<RadarShareOnContainer>
				{randomList && <SongMarkerListMemoized markerList={randomList} handleMarkerInfoOpen={handleMarkerInfoOpen} />}
				<BackgroundContainer>
					<UserContainer>
						<EmojiWrapper>
							<Image src={PROFILE_IMAGES[user.profileImg]} alt={`${user.nickname} 님의 프로필 이미지`} />
						</EmojiWrapper>
						<Text text={user.nickname} />
					</UserContainer>
					<BackgroundRound />
				</BackgroundContainer>
			</RadarShareOnContainer>

			{isDetailOpen && detailItem && (
				<MarkerDetailInfo item={detailItem} isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} />
			)}
		</>
	);
}

export default RadarShareOn;
