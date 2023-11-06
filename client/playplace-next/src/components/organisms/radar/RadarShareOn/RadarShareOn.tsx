import Text from '@/components/atoms/Text/Text';
import { useCallback, useContext, useEffect, useState } from 'react';
import { UserInfo } from '@/types/auth';
import Image from 'next/image';
import { PROFILE_IMAGES } from '@/constants/member';
import { CurrentLocation, IAroundPeople } from '@/types/radar';
import SongMarkerList from '@/components/molecules/SongMarkerList/SongMarkerList';
import getRandomMarkerList from '@/utils/common/randomMarkerList';
import StompClientContext from '@/utils/common/StompClientContext';
import { BackgroundRound, BackgroundContainer, EmojiWrapper, RadarShareOnContainer, UserContainer } from './style';

function RadarShareOn() {
	const { publish, data } = useContext(StompClientContext);
	const [markerList, setMarkerList] = useState<IAroundPeople[] | null>(null);
	const [currentLocation, setCurrentLocation] = useState<CurrentLocation | null>(null);
	const [user] = useState<UserInfo>({
		emojiIdx: 0,
		nickname: '임하스',
	});
	const [randomList, setRandomList] = useState<(IAroundPeople | null)[] | null>();

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
		if (currentLocation) {
			getMarkerList();
		}
	}, [currentLocation, getMarkerList]);

	useEffect(() => {
		if (markerList) {
			setRandomList(getRandomMarkerList(markerList));
		}
	}, [markerList]);

	useEffect(() => {
		console.log('current', currentLocation);
	}, [currentLocation]);

	useEffect(() => {
		setMarkerList(data);
	}, [data]);

	return (
		<RadarShareOnContainer>
			{randomList && <SongMarkerList markerList={randomList} />}
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
