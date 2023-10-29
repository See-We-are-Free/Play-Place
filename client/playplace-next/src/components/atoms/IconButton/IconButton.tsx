import React, { ReactNode } from 'react';
import IconButtonWrapper from './style';

interface IIconButtonProps {
	size: 's' | 'l';
	Icon: ReactNode;
	onClick: () => void;
}

function IconButton(props: IIconButtonProps) {
	const { size, Icon, onClick } = props;

	return (
		<IconButtonWrapper $size={size} onClick={onClick}>
			{Icon}
		</IconButtonWrapper>
	);
}

export default IconButton;
