import React, { ButtonHTMLAttributes } from 'react';
import { ButtonWrapper } from './style';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	content: string;
	buttontype: 'primary' | 'outlinePrimary' | 'success' | 'cancel';
	onClick?: () => void;
}

function Button({ content, onClick, buttontype }: IButtonProps) {
	return (
		<ButtonWrapper buttontype={buttontype} onClick={onClick}>
			{content}
		</ButtonWrapper>
	);
}

export default Button;
