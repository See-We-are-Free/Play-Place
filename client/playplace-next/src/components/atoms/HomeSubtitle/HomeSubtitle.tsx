import React from 'react';
import HomeSubtitleContainer from './style';
import Text from '../Text/Text';

interface HomeSubtitleProps {
	colorSubtitle: string;
	normalSubtitle: string;
}
function HomeSubtitle(props: HomeSubtitleProps) {
	const { colorSubtitle, normalSubtitle } = props;
	return (
		<HomeSubtitleContainer>
			<Text text={colorSubtitle} color="gradientOrange" fontSize={18} />
			<Text text={normalSubtitle} color="default" fontSize={18} />
		</HomeSubtitleContainer>
	);
}

export default HomeSubtitle;
