import styled from 'styled-components';

const PlayBarSongInfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
	width: 60%;

	#song {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 65%;

		p {
			height: fit-content;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}

	img {
		border-radius: var(--radius-s);
		width: 50px;
		height: 50px;
		min-width: 50px;
		max-width: 50px;
	}
`;

export default PlayBarSongInfoContainer;
