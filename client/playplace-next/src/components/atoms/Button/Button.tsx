import React, { ButtonHTMLAttributes } from 'react';
import { ButtonContainer, SocialImage } from './style';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	content: string;
	buttontype: 'primary' | 'outlinePrimary' | 'success' | 'cancel';
	onClick?: () => void;
	socialImg: boolean;
}

function Button({ content, onClick, buttontype, socialImg }: IButtonProps) {
	const test = 'dd';
	return (
		<ButtonContainer buttontype={buttontype} onClick={onClick}>
			{socialImg ? <SocialImage src={test} alt="" /> : <></>}
			{content}
		</ButtonContainer>
	);
}

export default Button;

Button.defaultProps = {
	onClick: () => '',
};
