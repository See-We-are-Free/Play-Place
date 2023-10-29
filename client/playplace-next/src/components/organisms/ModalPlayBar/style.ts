import styled from 'styled-components';

const ModalPlayBarContainer = styled.div`
	height: 70px;
	padding: 0 10px;
	position: fixed;
	bottom: 0;
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	svg {
		width: 60px;
		height: 60px;
	}
`;

export default ModalPlayBarContainer;
