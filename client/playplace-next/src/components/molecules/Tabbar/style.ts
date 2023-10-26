import styled from 'styled-components';

const TabbarContainer = styled.div`
	height: 80px;
	position: fixed;
	bottom: 0;
	width: 100%;
	display: flex;
	flex-direction: row;

	& > * {
		flex-basis: 25%;
	}
`;

export default TabbarContainer;
