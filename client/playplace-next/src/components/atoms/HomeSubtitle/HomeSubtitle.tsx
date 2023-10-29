import React from 'react';
import { HomeSubtitleStyles } from '@/types/styles.d';
import HomeSubtitleContainer, { HomeSubtitleContent } from './style';

interface HomeSubtitleProps {
	colorSubtitle: string;
	normalSubtitle: string;
}
function HomeSubtitle(props: HomeSubtitleProps) {
	const { colorSubtitle, normalSubtitle } = props;
	return (
		<HomeSubtitleContainer>
			<HomeSubtitleContent $subtitleType={HomeSubtitleStyles.color}>{colorSubtitle}</HomeSubtitleContent>
			<HomeSubtitleContent $subtitleType={HomeSubtitleStyles.normal}>{normalSubtitle}</HomeSubtitleContent>
		</HomeSubtitleContainer>
	);
}

export default HomeSubtitle;
