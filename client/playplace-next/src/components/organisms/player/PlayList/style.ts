import styled from 'styled-components';

const PlayListContainer = styled.div`
	height: calc(100vh - 90px);
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 30px;
	overflow-y: scroll;

	#basic-song-group {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	#landmark-song-groups {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
`;

export default PlayListContainer;
