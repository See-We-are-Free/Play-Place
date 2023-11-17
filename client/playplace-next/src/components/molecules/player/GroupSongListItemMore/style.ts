import styled from 'styled-components';

const GroupSongListItemMoreContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	justify-content: center;
	padding: 20px;

	#song-info {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}

	#menu {
		li {
			display: flex;
			gap: 10px;
			align-items: center;
		}

		display: flex;
		flex-direction: column;
		gap: 10px;
	}
`;

export default GroupSongListItemMoreContainer;
