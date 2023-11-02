import styled from 'styled-components';

const PlayBarSongInfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;

	#song {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		overflow: hidden;

		p {
			height: fit-content;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
`;

export default PlayBarSongInfoContainer;
