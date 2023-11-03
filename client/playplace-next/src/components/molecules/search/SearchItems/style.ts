import styled from 'styled-components';

const SearchItemsContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const SearchItemsSongInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const SearchItemsContent = styled.div`
	display: flex;
	gap: 5px;
`;

export const SearchItemsButton = styled.button`
	svg {
		width: 20px;
		height: 20px;
	}
`;
export default SearchItemsContainer;
