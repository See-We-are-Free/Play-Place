import styled from 'styled-components';

const PlayListContainer = styled.div`
	height: calc(100vh - 90px);
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	overflow-y: scroll;

	#basic-song-group {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	#landmark-song-groups {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
`;

export default PlayListContainer;
