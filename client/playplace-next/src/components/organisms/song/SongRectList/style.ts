import styled from 'styled-components';

const SongRectListContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const SongRectListScroll = styled.ul`
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

export const SongRectListContent = styled.div`
	position: relative;
`;

export const SongRectListInfoPlay = styled.div`
	width: 100%;
	display: flex;
	position: absolute;
	justify-content: space-between;
	bottom: 10%;
	padding: 0 10px;
`;

export const SongRectListInfo = styled.div`
	display: flex;
	flex-direction: column;
`;

export const SongRectListPlay = styled.button`
	svg {
		width: 24px;
		height: 24px;
	}
`;

export default SongRectListContainer;
