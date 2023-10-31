import styled from 'styled-components';

export const HeaderRightItemContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	gap: 10px;

	svg {
		width: 25px;
		height: 25px;
	}
`;

export const ItemContainer = styled.div`
	button {
		padding: 0;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		gap: 2px;
	}

	svg {
		width: 16px;
		height: 16px;
		fill: var(--white-500);
	}
`;

export const Text = styled.span`
	font-size: 12px;
	color: var(--white-500);
`;
