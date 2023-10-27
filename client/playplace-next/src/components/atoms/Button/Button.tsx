import React, { ButtonHTMLAttributes } from 'react';
import { ButtonContainer, SocialImage } from './style';
import GoogleLogo from '@root/public/assets/images/googleLogo.png';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	content: string;
	buttontype: 'primary' | 'outlinePrimary' | 'success' | 'cancel';
	onClick?: () => void;
	socialImg: boolean;
}

function Button({ content, onClick, buttontype, socialImg }: IButtonProps) {
	return (
		<ButtonContainer buttontype={buttontype} onClick={onClick}>
			{socialImg ? <SocialImage src={GoogleLogo} alt="" /> : <></>}
			{content}
		</ButtonContainer>
	);
}

export default Button;
