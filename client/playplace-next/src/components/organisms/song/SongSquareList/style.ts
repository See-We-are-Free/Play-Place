import styled from 'styled-components';

const SongSquareListContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const SongSquareListScroll = styled.ul`
	overflow-x: scroll;
	overflow-y: visible;
	white-space: nowrap;
	display: flex;
	justify-content: start;
	align-items: center;
	gap: 20px;

	&::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera*/
	}
`;

export const SongSquareListContent = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 130px;
`;

export const SongSquareButton = styled.button`
	position: absolute;
	top: 35%;
	left: 36%;

	svg {
		height: 24px;
		width: 24px;
	}
`;

export default SongSquareListContainer;
