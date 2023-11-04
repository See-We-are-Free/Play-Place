// import RefreshIcon from '@root/public/assets/icons/Refresh.svg';
import Text from '@/components/atoms/Text/Text';
import { useCallback, useEffect, useState } from 'react';
import { UserInfo } from '@/types/auth';
import Image from 'next/image';
import { PROFILE_IMAGES } from '@/constants/member';
import { getAroundPeople } from '@/utils/api/radar';
import { CurrentLocation, IAroundPeople } from '@/types/radar';
import SongMarkerList from '@/components/molecules/SongMarkerList/SongMarkerList';
import getRandomMarkerList from '@/utils/common/randomMarkerList';
import { BackgroundRound, BackgroundContainer, EmojiWrapper, RadarShareOnContainer, UserContainer } from './style';

function RadarShareOn() {
	const [markerList, setMarkerList] = useState<IAroundPeople[] | null>(null);
	const [currentLocation, setCurrentLocation] = useState<CurrentLocation | null>(null);
	const [user] = useState<UserInfo>({
		emojiIdx: 0,
		nickname: '임하스',
	});

	const getMarkerList = useCallback(async () => {
		if (currentLocation) {
			const response = await getAroundPeople(currentLocation);
			// const response = await developGetAroundPeople(currentLocation); // 개발용
			if (response.status === 200) {
				console.log('res', response.data);
				setMarkerList(response.data.data);
			}
		}
	}, [currentLocation]);

	const getCurrentLocation = useCallback(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			const location = {
				longitude: position.coords.longitude,
				latitude: position.coords.latitude,
			};
			setCurrentLocation(location);
		});
	}, []);

	useEffect(() => {
		if (!currentLocation) {
			getCurrentLocation();
		}
		if (currentLocation && !markerList) {
			getMarkerList();
		}
	}, [currentLocation, getCurrentLocation, getMarkerList, markerList]);

	useEffect(() => {
		if (markerList) {
			console.log('getList', getRandomMarkerList(markerList));
		}
	}, [markerList]);

	useEffect(() => {
		console.log('current', currentLocation);
	}, [currentLocation]);

	return (
		<RadarShareOnContainer>
			{/* <button type="button" onClick={handleRefresh}>
				<RefreshIcon />
				<Text text="재탐색" />
			</button> */}

			{markerList && <SongMarkerList markerList={getRandomMarkerList(markerList)} />}
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
