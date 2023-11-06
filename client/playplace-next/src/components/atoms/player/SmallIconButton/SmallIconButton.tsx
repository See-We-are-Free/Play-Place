import React, { ReactNode } from 'react';
import SmallIconButtonWrapper from './style';
import IconButton from '../../IconButton/IconButton';

interface ISmallIconButtonProps {
	Icon: ReactNode;
	onClick: () => void;
	color: 'black300' | 'white100';
	text: string;
}
function SmallIconButton(props: ISmallIconButtonProps) {
	const { Icon, onClick, color, text } = props;

	return (
		<SmallIconButtonWrapper onClick={onClick}>
			<IconButton Icon={Icon} size="s" color={color} />
			<span>{text}</span>
		</SmallIconButtonWrapper>
	);
}

export default SmallIconButton;
