import styled from 'styled-components';

const SongCircleListContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const SongCircleListScroll = styled.ul`
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

export const SongCircleListContent = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const SongCircleListInfo = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 200px;
`;

export default SongCircleListContainer;
