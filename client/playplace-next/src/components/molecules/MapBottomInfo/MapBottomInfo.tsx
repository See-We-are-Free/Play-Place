import React from 'react';
import Text from '@/components/atoms/Text/Text';
import ListPlus from '@root/public/assets/icons/ListPlus.svg';
import Button from '@/components/atoms/Button/Button';
import { ButtonStyles, ToastStyles } from '@/types/styles.d';
import CustomToast from '@/components/atoms/CustomToast/CustomToast';
import useFetchPlaylist from '@/hooks/player/useFetchPlaylist';
import { addGroupToPlaylistApi } from '@/utils/api/landmarks';
import MapBottomInfoContainer, {
	MapBottomButton,
	MapBottomInfoIcon,
	MapBottomInfoLandmarkInfo,
	MapBottomInfoTitle,
} from './style';

interface IMapBottomInfoProps {
	landMarkTitle: string;
	songVolume: number;
	isDistance: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	landmarkId: number;
}

function MapBottomInfo(props: IMapBottomInfoProps) {
	const { landMarkTitle, songVolume, setOpen, isDistance, landmarkId } = props;
	const { fetchData } = useFetchPlaylist();

	const searchOpen = () => {
		if (isDistance === true) {
			setOpen(true);
		} else {
			CustomToast(ToastStyles.noTabbarError, '100m안에서 등록이 가능합니다!');
		}
	};

	const addGroupToPlaylist = async () => {
		if (window.confirm(`${landMarkTitle} 그룹을 내 재생목록에 추가하시겠어요?`)) {
			try {
				const response = await addGroupToPlaylistApi(landmarkId);

				console.log(response);
				if (response.status === 200) {
					fetchData();
				}
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<MapBottomInfoContainer>
			<MapBottomInfoTitle>
				<MapBottomInfoLandmarkInfo>
					<Text text={landMarkTitle} color="default" fontSize={20} />
					<Text text={`${songVolume} / 99`} color="gray" fontSize={12} />
				</MapBottomInfoLandmarkInfo>
				<MapBottomInfoIcon type="button" onClick={addGroupToPlaylist}>
					<ListPlus />
				</MapBottomInfoIcon>
			</MapBottomInfoTitle>
			<MapBottomButton>
				<Button
					content="랜드마크에 음악 추가하기"
					buttonType={ButtonStyles.primary}
					socialImg={false}
					onClick={searchOpen}
				/>
			</MapBottomButton>
		</MapBottomInfoContainer>
	);
}

export default MapBottomInfo;
