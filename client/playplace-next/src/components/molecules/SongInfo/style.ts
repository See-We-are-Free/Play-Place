import styled from 'styled-components';

const SongInfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;

	#song {
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;

		p {
			height: fit-content;
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

export default SongInfoContainer;
