import React, { useEffect, useState } from 'react';
import Text from '@/components/atoms/Text/Text';
import ListPlus from '@root/public/assets/icons/ListPlus.svg';
import Button from '@/components/atoms/Button/Button';
import { ButtonStyles, ToastStyles } from '@/types/styles.d';
import CustomToast from '@/components/atoms/CustomToast/CustomToast';
import useFetchPlaylist from '@/hooks/player/useFetchPlaylist';
import { addGroupToPlaylistApi } from '@/utils/api/landmarks';
import { useRecoilState } from 'recoil';
import { playModalState } from '@/recoil/play';
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
	const [, setPlayModal] = useRecoilState(playModalState);
	const [confirm, setConfirm] = useState<boolean>(false);

	const searchOpen = () => {
		if (isDistance === true) {
			setOpen(true);
		} else {
			CustomToast(
				ToastStyles.noTabbarError,
				'100m 이내에 있는 랜드마크에만 등록할 수 있습니다! 이동 후 다시 시도하세요.',
			);
		}
	};

	const confirmLandmarkGroup = () => {
		if (typeof window !== undefined && window.AndAlert) {
			window.AndAlert.cofirmTest('재생목록', `${landMarkTitle} 그룹을 내 재생목록에 추가하시겠어요?`);
			setConfirm(true);
		}
	};

	const addGroupToPlaylist = async () => {
		try {
			const response = await addGroupToPlaylistApi(landmarkId);

			if (response.status === 200) {
				fetchData();
				setPlayModal('playlist');
				CustomToast(ToastStyles.noTabbarSuccess, `랜드마크 재생목록에 ${landMarkTitle} 이/가 추가 됐습니다.`);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (typeof window !== undefined && confirm === true) {
			window.confirmCallback = function (result: boolean) {
				if (result === false) {
					CustomToast(ToastStyles.noTabbarError, `랜드마크 재생목록 추가 취소`);
				} else {
					addGroupToPlaylist();
				}
			};
		}
		setConfirm(false);
	}, [confirm]);

	return (
		<MapBottomInfoContainer>
			<MapBottomInfoTitle>
				<MapBottomInfoLandmarkInfo>
					<Text text={landMarkTitle} color="default" fontSize={20} $overflowHidden={false} />
					<Text text={`${songVolume} / 99`} color="gray" fontSize={12} />
				</MapBottomInfoLandmarkInfo>
				<MapBottomInfoIcon type="button" onClick={confirmLandmarkGroup}>
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
