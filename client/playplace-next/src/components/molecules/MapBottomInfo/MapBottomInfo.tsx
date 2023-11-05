import React from 'react';
import Text from '@/components/atoms/Text/Text';
import ListPlus from '@root/public/assets/icons/ListPlus.svg';
import Button from '@/components/atoms/Button/Button';
import { ButtonStyles, ToastStyles } from '@/types/styles.d';
import CustomToast from '@/components/atoms/CustomToast/CustomToast';
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
}

function MapBottomInfo(props: IMapBottomInfoProps) {
	const { landMarkTitle, songVolume, setOpen, isDistance } = props;

	const searchOpen = () => {
		if (isDistance === true) {
			setOpen(true);
		} else {
			CustomToast(ToastStyles.error, '100m안에서 등록이 가능합니다!');
		}
	};

	const test = () => {
		alert('button');
	};
	return (
		<MapBottomInfoContainer>
			<MapBottomInfoTitle>
				<MapBottomInfoLandmarkInfo>
					<Text text={landMarkTitle} color="default" fontSize={20} />
					<Text text={`${songVolume} / 99`} color="gray" fontSize={12} />
				</MapBottomInfoLandmarkInfo>
				<MapBottomInfoIcon type="button" onClick={test}>
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
