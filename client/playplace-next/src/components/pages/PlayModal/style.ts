import { PlayModalType } from '@/types/play';
import styled, { css } from 'styled-components';

interface IPlayModalContainerProps {
	$playModal: PlayModalType;
}

const PlayModalContainer = styled.div<IPlayModalContainerProps>`
	background-color: var(--black-700);
	position: fixed;
	top: 0;
	width: 100vw;
	height: 100vh;
	transition: all 0.2s;
	z-index: var(--zindex-modal);

	${({ $playModal }) =>
		$playModal === 'none'
			? css`
					transform: translateY(100%);
			  `
			: css`
					transform: translateY(0);
			  `}
`;

export default PlayModalContainer;
