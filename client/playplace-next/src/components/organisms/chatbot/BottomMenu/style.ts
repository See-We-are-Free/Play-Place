import styled from 'styled-components';

const BottomMenuContainer = styled.div`
	background-color: var(--black-700);
	width: 100%;
	height: 70px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	#camera-icon {
		background: var(--primary-grandiant-main);
		border-radius: var(--radius-l);
		width: 50px;
		height: 50px;
		padding: 10px;
	}
`;

export default BottomMenuContainer;
