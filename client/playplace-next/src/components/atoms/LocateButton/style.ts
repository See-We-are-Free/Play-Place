import styled from 'styled-components';

const LocateButtonContainer = styled.button`
	position: absolute;
	z-index: 3;
	top: 10px;
	right: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	background-color: var(--black-700);
	border-radius: 50%;

	path {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 30px;
		height: 30px;
	}
`;

export default LocateButtonContainer;
