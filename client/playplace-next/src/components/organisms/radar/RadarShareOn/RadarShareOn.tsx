import Text from '@/components/atoms/Text/Text';
import { memo, useCallback, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { PROFILE_IMAGES } from '@/constants/member';
import { IAroundPeople } from '@/types/radar';
import SongMarkerList from '@/components/molecules/SongMarkerList/SongMarkerList';
import getRandomMarkerList from '@/utils/common/randomMarkerList';
import StompClientContext from '@/utils/common/StompClientContext';
import { useRecoilState } from 'recoil';
import userInfoState from '@/recoil/user';
import { getUserInfoApi } from '@/utils/api/auth';
import CustomToast from '@/components/atoms/CustomToast/CustomToast';
import { ToastStyles } from '@/types/styles.d';
import { useRouter } from 'next/navigation';
import useLocalStorage from '@/hooks/useLocalStorage';
import { BackgroundRound, BackgroundContainer, EmojiWrapper, RadarShareOnContainer, UserContainer } from './style';
import MarkerDetailInfo from '../MarkerDetailInfo/MarkerDetailInfo';

function RadarShareOn() {
	const { data } = useContext(StompClientContext);
	const router = useRouter();
	const [markerList, setMarkerList] = useState<IAroundPeople[] | null>(null);
	const [user, setUser] = useRecoilState(userInfoState);
	const [randomList, setRandomList] = useState<(IAroundPeople | null)[] | null>();
	const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
	const [detailItem, setDetailItem] = useState<IAroundPeople | null>(null);
	const SongMarkerListMemoized = memo(SongMarkerList);
	const localStorage = useLocalStorage();

	const handleMarkerInfoOpen = (item: IAroundPeople) => {
		console.log('handleMarkerInfoOpen', item);
		setDetailItem(item);
		setIsDetailOpen(true);
	};

	const getUserInfo = useCallback(async () => {
		try {
			const response = await getUserInfoApi();
			if (response.status === 200) {
				console.log('getUserInfo', response);
				setUser(response.data.data);
			} else {
				CustomToast(ToastStyles.error, '로그인이 필요한 서비스입니다.');
				router.push('/login');
			}
		} catch (error) {
			console.error(error);
		}
	}, [router, setUser]);

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

	useEffect(() => {
		if (!user) {
			getUserInfo();
		}
	}, [user]);

	return (
		<>
			<RadarShareOnContainer>
				{/* {randomList && <SongMarkerList markerList={randomList} handleMarkerInfoOpen={handleMarkerInfoOpen} />} */}
				{randomList && <SongMarkerListMemoized markerList={randomList} handleMarkerInfoOpen={handleMarkerInfoOpen} />}
				<BackgroundContainer>
					{user && (
						<UserContainer>
							<EmojiWrapper>
								<Image src={PROFILE_IMAGES[user.profileImg]} alt={`${user.nickname} 님의 프로필 이미지`} />
							</EmojiWrapper>
							<Text text={user.nickname} />
						</UserContainer>
					)}
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
