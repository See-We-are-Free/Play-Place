import styled from 'styled-components';

const SmallIconButtonWrapper = styled.div`
	width: fit-content;
	height: 26px;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 5px;

	button {
		width: 18px;
		height: 18px;

		svg {
			width: 18px;
			width: 18px;
			fill: var(--black-300);
		}
	}
	span {
		font-size: 10px;
		color: var(--black-300);
		white-space: nowrap;
	}
`;

export default SmallIconButtonWrapper;
