'use client';

import Image from 'next/image';
import LogoImg from '@root/public/assets/images/Logo.png';
import ImageWrapper from './style';

function Logo() {
	return (
		<ImageWrapper>
			<Image src={LogoImg} alt="logo image" />
		</ImageWrapper>
	);
}

export default Logo;
