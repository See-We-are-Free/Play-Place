import React from 'react';
import Text from '@/components/atoms/Text/Text';
import ListPlus from '@root/public/assets/icons/ListPlus.svg';
import Button from '@/components/atoms/Button/Button';
import { ButtonStyles } from '@/types/styles';
import MapBottomInfoContainer, { MapBottomInfoIcon, MapBottomInfoLandmarkInfo, MapBottomInfoTitle } from './style';

interface IMapBottomInfoProps {
	landMarkTitle: string;
	songVolume: number;
}

function MapBottomInfo(props: IMapBottomInfoProps) {
	const { landMarkTitle, songVolume } = props;

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
			<Button content="랜드마크에 음악 추가하기" buttonType={ButtonStyles.primary} socialImg={false} onClick={test} />
		</MapBottomInfoContainer>
	);
}

export default MapBottomInfo;
