import styled from 'styled-components';

const ItemWrapper = styled.li`
	&:first-child {
		padding-left: 20px;
	}
	&:last-child {
		padding-right: 20px;
	}

	button {
		width: 82px;
		height: 80px;
		padding: 14px;
		background-color: var(--black-700);
		border-radius: 10px;

		img {
			width: 100%;
			height: 100%;
		}
	}

	button.active {
		background-color: var(--black-500);
		padding: 10px;

		img {
			width: 100%;
			height: 100%;
		}
	}
`;

export default ItemWrapper;
