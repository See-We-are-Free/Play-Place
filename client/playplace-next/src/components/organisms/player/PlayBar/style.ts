import styled from 'styled-components';

const PlayBarContainer = styled.div`
	position: relative;
	width: 100%;
	height: 70px;
	position: fixed;
	bottom: 70px;
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: var(--black-500);
	padding: 0 10px;
	border-bottom: 1px solid var(--white-800);
	z-index: var(--zindex-fixed);

	#song-info {
		width: 60%;
	}

	#playbar-play-control {
		position: absolute;
		right: 10px;
	}
`;

export default PlayBarContainer;
