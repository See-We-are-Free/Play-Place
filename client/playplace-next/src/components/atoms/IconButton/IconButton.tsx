import React, { ReactNode } from 'react';
import IconButtonWrapper from './style';

interface IIconButtonProps {
	id?: string;
	size: 's' | 'm' | 'l';
	color: 'white100' | 'black300';
	Icon: ReactNode;
	onClick?: () => void;
}

function IconButton(props: IIconButtonProps) {
	const { id = '', size, Icon, onClick = () => {}, color } = props;

	return (
		<IconButtonWrapper id={id} $color={color} $size={size} onClick={onClick}>
			{Icon}
		</IconButtonWrapper>
	);
}

export default IconButton;
