import styled from 'styled-components';

const PlayBarContainer = styled.div`
	width: 100%;
	height: 70px;
	position: fixed;
	bottom: 70px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	background-color: var(--black-500);
	padding: 0 10px;
	border-bottom: 1px solid var(--white-800);
`;

export default PlayBarContainer;
