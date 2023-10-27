import React, { ButtonHTMLAttributes } from 'react';
import GoogleLogo from '@root/public/assets/images/googleLogo.png';
import { ButtonContainer, SocialImage } from './style';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	content: string;
	buttontype: 'primary' | 'outlinePrimary' | 'success' | 'cancel';
	onClick?: () => void;
	socialImg: boolean;
}

function Button(props: IButtonProps) {
	const { content, onClick = () => {}, buttontype, socialImg } = props;

	return (
		<ButtonContainer buttontype={buttontype} onClick={onClick}>
			{socialImg ? <SocialImage src={GoogleLogo} alt="" /> : <></>}
			{content}
		</ButtonContainer>
	);
}

export default Button;
