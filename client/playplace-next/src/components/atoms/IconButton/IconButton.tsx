import React, { MouseEvent, ReactNode } from 'react';
import IconButtonWrapper from './style';

interface IIconButtonProps {
	id?: string;
	size: 's' | 'm' | 'l';
	color: 'white100' | 'black300' | 'danger';
	Icon: ReactNode;
	onClick?: (() => void) | ((event: MouseEvent<HTMLButtonElement>) => void);
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
