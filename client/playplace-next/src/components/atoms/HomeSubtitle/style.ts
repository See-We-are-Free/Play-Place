import { HomeSubtitleStyles } from '@/types/styles';
import styled, { css } from 'styled-components';

interface IHomeSubtitleStyleProps {
	$subtitleType: HomeSubtitleStyles;
}

const SubtitleTypes = {
	color: css`
		background-image: var(--primary-grandiant-sub-orange);
		-webkit-background-clip: text;
		color: transparent;
	`,
	normal: css`
		color: var(--white-100);
	`,
};

const HomeSubtitleContainer = styled.div`
	display: flex;
	gap: 4px;
`;

export const HomeSubtitleContent = styled.span<IHomeSubtitleStyleProps>`
	font-size: 18px;
	${({ $subtitleType }) => SubtitleTypes[$subtitleType]}
`;

export default HomeSubtitleContainer;
