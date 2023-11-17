import styled from 'styled-components';

const SongRectItemsContainer = styled.div`
	border-radius: var(--radius-s);
	margin: 10px 0;
	position: relative;
	overflow: hidden;

	& > div {
		width: 130px;
		height: 180px;
		overflow: hidden;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		img {
			width: 100%;
			height: auto;
			transform: scale(1.8);
		}
	}
`;

export const SongAlpaBackground = styled.div`
	position: absolute;
	width: 100%;
	height: calc(100% - 19px);
	bottom: 9px;
	left: 0;
	border-radius: 20px;
	background: linear-gradient(180deg, rgba(217, 217, 217, 0) 60.07%, rgba(34, 34, 34, 0.8) 100%);
`;

export default SongRectItemsContainer;
