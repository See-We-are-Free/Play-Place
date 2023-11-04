import React from 'react';
import IconButton from '@/components/atoms/IconButton/IconButton';
import Camera from '@root/public/assets/icons/Camera.svg';
import BottomMenuContainer from './style';

function BottomMenu() {
	return (
		<BottomMenuContainer>
			<IconButton id="camera-icon" Icon={<Camera />} color="white100" size="s" onClick={() => {}} />
		</BottomMenuContainer>
	);
}

export default BottomMenu;
