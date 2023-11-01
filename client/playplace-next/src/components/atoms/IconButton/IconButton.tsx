import React, { ReactNode } from 'react';
import IconButtonWrapper from './style';

interface IIconButtonProps {
	size: 's' | 'm' | 'l';
	color: 'white100' | 'black300';
	Icon: ReactNode;
	onClick: () => void;
}

function IconButton(props: IIconButtonProps) {
	const { size, Icon, onClick, color } = props;

	return (
		<IconButtonWrapper $color={color} $size={size} onClick={onClick}>
			{Icon}
		</IconButtonWrapper>
	);
}

export default IconButton;
