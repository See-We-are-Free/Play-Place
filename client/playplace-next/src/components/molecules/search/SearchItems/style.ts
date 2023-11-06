import styled from 'styled-components';

const SearchItemsContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const SearchItemsSongInfo = styled.div`
	width: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
`;

export const SearchItemsContent = styled.div`
	display: flex;
	gap: 5px;
	width: calc(100% - 30px);
	overflow: hidden;
`;

export const SearchItemsButton = styled.button`
	svg {
		width: 20px;
		height: 20px;
		fill: var(--white);
	}
`;

export const SearchItemsButtonContainer = styled.div`
	display: flex;
	gap: 10px;
`;
export default SearchItemsContainer;
