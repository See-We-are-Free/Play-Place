import styled from 'styled-components';

const LoginContainer = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;

	button {
		width: calc(100% - 20px);
		position: fixed;
		bottom: 30px;

		&::before {
			width: 100%;
		}
		&::after {
			width: calc(100% - 2px);
		}
	}
`;

export default LoginContainer;
