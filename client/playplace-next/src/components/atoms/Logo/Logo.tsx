'use client';

import Image from 'next/image';
import LogoImg from '@root/public/assets/images/Logo.png';
import ImageWrapper from './style';

interface LogoProps {
	width?: string;
}

function Logo(props: LogoProps) {
	const { width } = props;

	return (
		<ImageWrapper width={width}>
			<Image src={LogoImg} alt="logo image" />
		</ImageWrapper>
	);
}

export default Logo;
