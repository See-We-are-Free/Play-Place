import styled from 'styled-components';

const NicknameContainer = styled.div`
	margin: '0 auto';
	padding: 20px;

	p {
		margin-bottom: 10px;
	}

	input {
		width: 100%;
		padding: 10px;
		background-color: var(--black-600);
		border: none;
		text-align: center;
		color: var(--white-100);
		font-size: 16px;

		&::placeholder {
			color: var(--white-700);
		}
	}
`;

export default NicknameContainer;
