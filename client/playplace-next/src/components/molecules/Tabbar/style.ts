import styled from 'styled-components';

const TabbarContainer = styled.nav`
	height: 70px;
	position: fixed;
	bottom: 0;
	width: 100%;
	display: flex;
	flex-direction: row;
	background-color: var(--black-500);
	z-index: var(--zindex-fixed);

	& > * {
		flex-basis: 25%;
	}
`;

export default TabbarContainer;
