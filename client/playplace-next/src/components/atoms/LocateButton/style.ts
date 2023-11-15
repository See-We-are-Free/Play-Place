import styled from 'styled-components';

const LocateButtonContainer = styled.button`
	position: absolute;
	z-index: 3;
	bottom: 10px;
	left: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	background-color: var(--white);
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
