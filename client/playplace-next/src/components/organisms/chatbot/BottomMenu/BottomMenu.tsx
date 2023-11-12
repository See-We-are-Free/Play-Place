import React from 'react';
import IconButton from '@/components/atoms/IconButton/IconButton';
import Camera from '@root/public/assets/icons/Camera.svg';
import BottomMenuContainer from './style';

function BottomMenu() {
	const openCamera = () => {
		window.AndCamera.openCamera();
	};

	return (
		<BottomMenuContainer>
			<IconButton id="camera-icon" Icon={<Camera />} color="white100" size="s" onClick={openCamera} />
		</BottomMenuContainer>
	);
}

export default BottomMenu;
