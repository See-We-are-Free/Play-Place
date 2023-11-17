import styled from 'styled-components';

const MypageLikeItemsContainer = styled.div`
	background-color: var(--black-500);
	border-radius: var(--radius-s);
	padding: 10px;
`;

export const EmptyContent = styled.div`
	text-align: center;

	& > p:first-child {
		color: var(--white-200);
		margin-bottom: 10px;
	}
	& > p:nth-child(2) {
		color: var(--white-500);
		margin-bottom: 20px;
	}
	& > button {
		margin: 0 auto;
		color: var(--white-500);
		display: flex;
		flex-direction: row;
		gap: 4px;
		align-items: center;

		& > svg {
			width: 20px;
			height: 20px;
			fill: var(--white-100);
		}
	}
`;

export default MypageLikeItemsContainer;
