import Text from '@/components/atoms/Text/Text';
import { memo, useCallback, useContext, useEffect, useState } from 'react';
import { UserInfo } from '@/types/auth';
import Image from 'next/image';
import { PROFILE_IMAGES } from '@/constants/member';
import { CurrentLocation, IAroundPeople } from '@/types/radar';
import SongMarkerList from '@/components/molecules/SongMarkerList/SongMarkerList';
import getRandomMarkerList from '@/utils/common/randomMarkerList';
import StompClientContext from '@/utils/common/StompClientContext';
import { BackgroundRound, BackgroundContainer, EmojiWrapper, RadarShareOnContainer, UserContainer } from './style';
import MarkerDetailInfo from '../MarkerDetailInfo/MarkerDetailInfo';

function RadarShareOn() {
	const { publish, data } = useContext(StompClientContext);
	const [markerList, setMarkerList] = useState<IAroundPeople[] | null>(null);
	const [currentLocation, setCurrentLocation] = useState<CurrentLocation | null>(null);
	const [user] = useState<UserInfo>({
		emojiIdx: 0,
		nickname: '임하스',
	});
	const [randomList, setRandomList] = useState<(IAroundPeople | null)[] | null>();
	const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
	const [detailItem, setDetailItem] = useState<IAroundPeople | null>(null);
	const SongMarkerListMemoized = memo(SongMarkerList);

	const handleMarkerInfoOpen = (item: IAroundPeople) => {
		console.log('handleMarkerInfoOpen', item);
		setDetailItem(item);
		setIsDetailOpen(true);
	};

	const getMarkerList = useCallback(async () => {
		if (currentLocation) {
			publish(currentLocation.latitude, currentLocation.longitude);
		}
	}, [currentLocation, publish]);

	const getCurrentLocation = useCallback(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			const location = {
				longitude: position.coords.longitude,
				latitude: position.coords.latitude,
			};
			console.log('현재 위치', location);
			setCurrentLocation(location);
		});
	}, []);

	useEffect(() => {
		if (!currentLocation) {
			getCurrentLocation();
		}
	}, [currentLocation, getCurrentLocation]);

	useEffect(() => {
		let intervalId: NodeJS.Timeout;

		if (currentLocation) {
			getMarkerList();
			intervalId = setInterval(() => {
				getMarkerList();
			}, 30000);
		}

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [currentLocation, getMarkerList]);

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
				{/* {randomList && <SongMarkerList markerList={randomList} handleMarkerInfoOpen={handleMarkerInfoOpen} />} */}
				{randomList && <SongMarkerListMemoized markerList={randomList} handleMarkerInfoOpen={handleMarkerInfoOpen} />}
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

			{isDetailOpen && detailItem && (
				<MarkerDetailInfo item={detailItem} isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} />
			)}
		</>
	);
}

export default RadarShareOn;
