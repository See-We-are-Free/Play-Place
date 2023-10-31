import styled from 'styled-components';

export const HeaderLeftItemContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 4px;

	button {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	svg {
		width: 25px;
		height: 25px;
	}
`;

export const Title = styled.h1`
	font-size: 18px;
	font-weight: 600;
`;
