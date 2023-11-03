import styled from 'styled-components';

export const HeaderWrapper = styled.header`
	width: 100%;
	height: 50px;
	position: fixed;
	background: var(--black-700);
	z-index: var(--zindex-header);
`;

export const HeaderContainer = styled.div`
	height: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
	padding: 0 16px;
`;

export const HeaderLeftItemWrapper = styled.div``;

export const HeaderRightItemWrapper = styled.div``;
