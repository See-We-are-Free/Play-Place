import styled from 'styled-components';

const PlayBarSongInfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;

	& > div:first-child {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border-radius: 4px;
		min-width: 45px;
		min-height: 45px;

		& > img {
			transform: scale(2);
		}
	}

	#song {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
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
