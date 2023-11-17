import styled from 'styled-components';

export const JoinAgreementContainer = styled.div`
	ul {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
`;

export const Line = styled.div`
	width: 100%;
	height: 0.3px;
	background-color: var(--black-500);
`;

export const AgreementListItem = styled.li`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;

	label {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 10px;

		/* input {
			width: 20px;
			height: 20px;
			border-radius: 50px;
			background-color: red;
		} */
		input[type='checkbox'] {
			position: relative;
			-webkit-appearance: none;
			width: 17px;
			height: 17px;
			border: 1px solid var(--black-400);
			border-radius: 50px;
			background-color: var(--black-600);

			&:checked {
				background: var(--primary-mint);
			}
		}
	}

	svg {
		width: 20px;
		height: 20px;
		fill: var(--black-300);
	}
`;

export const ItemContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	gap: 10px;
`;
