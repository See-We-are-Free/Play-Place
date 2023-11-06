import styled from 'styled-components';

const PlayListContainer = styled.div`
	height: calc(100vh - 90px);
	padding: 0 20px;
	display: flex;
	flex-direction: column;
	gap: 30px;
	overflow-y: scroll;

	#playlist-header {
		background-color: var(--black-700);
		padding: 20px;
		position: fixed;
		left: 0;
		width: 100%;
		z-index: var(--zindex-header);
	}

	#basic-song-group {
		margin-top: 40px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	#landmark-song-groups {
		display: flex;
		flex-direction: column;
		gap: 10px;

		button {
			padding: 0;
			text-align: start;
		}
	}
`;

export default PlayListContainer;
