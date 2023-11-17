import styled from 'styled-components';

const SearchTemplateContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 80vh;

	& > div:last-child {
		overflow: scroll;

		& > div {
			padding-bottom: 30px;
		}
	}
`;

export default SearchTemplateContainer;
