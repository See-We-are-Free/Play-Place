import React from 'react';
import Text from '@/components/atoms/Text/Text';
import ToggleButton from '@/components/atoms/ToggleButton/ToggleButton';
import MyPageToggleContainer from './style';

interface IMypageToggle {
	title: string;
	functionOnOff: boolean;
	handleFunction: () => void;
}
function MypageToggle(props: IMypageToggle) {
	const { title, functionOnOff, handleFunction } = props;

	return (
		<MyPageToggleContainer>
			<Text text={title} color="default" fontSize={14} />
			<ToggleButton isActive={functionOnOff} handleActive={handleFunction} />
		</MyPageToggleContainer>
	);
}

export default MypageToggle;
