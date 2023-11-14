import styled from 'styled-components';

const NowPlaySongInfoContainer = styled.div`
	position: relative;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 10px;

	#song {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 30px;
	}

	#progress {
	}

	img {
		aspect-ratio: 1/1;
	}
`;

export const NowPlaySongTitle = styled.div`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

export default NowPlaySongInfoContainer;
