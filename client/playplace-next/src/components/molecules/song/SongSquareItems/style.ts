import styled from 'styled-components';

const SongSquareItemsContainer = styled.div`
	border-radius: var(--radius-s);
	margin: 10px 0;
	padding: 0px;
	width: 130px;

	& > div {
		width: 130px;
		height: 130px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border-radius: 20px;

		& > img {
			width: 100%;
			height: auto;
			transform: scale(1.8);
		}
	}
`;

export default SongSquareItemsContainer;
