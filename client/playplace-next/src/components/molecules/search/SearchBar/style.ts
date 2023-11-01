import styled from 'styled-components';

const SearchBarContainer = styled.div`
	display: flex;
	height: 40px;
	background-color: var(--black-500);
	align-items: center;
	font-size: 12px;
	padding: 12px;
	justify-content: space-between;
`;

export const SearchBarInput = styled.input`
	color: var(--white-400);
	background-color: var(--black-500);
	border: none;
	width: 90%;

	&::placeholder {
		color: var(--white-800);
	}
`;

export const SearchBarButton = styled.button`
	width: 24px;
	height: 24px;

	svg {
		path {
			fill: var(--black-400);
		}
	}
`;

export default SearchBarContainer;
