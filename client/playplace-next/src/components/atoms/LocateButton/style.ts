import styled from 'styled-components';

const LocateButtonContainer = styled.button`
	position: absolute;
	z-index: 3;
	bottom: 89px;
	right: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 41px;
	background-color: var(--white);
	border-radius: 2px 2px 0 0;

	&::after {
		content: '';
		display: block;
		width: calc(100% - 8px);
		height: 0.65px;
		background-color: var(--white-100);
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	path {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 30px;
		height: 30px;
	}
`;

export default LocateButtonContainer;
