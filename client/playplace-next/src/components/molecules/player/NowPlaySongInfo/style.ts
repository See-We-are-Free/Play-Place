import styled from 'styled-components';

const NowPlaySongInfoContainer = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	gap: 15px;
	padding: 10px;

	#song {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	img {
		aspect-ratio: 1/1;
	}
`;

export default NowPlaySongInfoContainer;
