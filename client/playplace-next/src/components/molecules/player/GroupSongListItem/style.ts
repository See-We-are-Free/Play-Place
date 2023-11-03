import styled from 'styled-components';

const GroupSongListItemContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	gap: 10px;

	#song-info {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}

	#more {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 0;
		width: 30px;
		height: 30px;
		svg {
			width: 22px;
			height: 22px;
		}
	}
`;

export default GroupSongListItemContainer;
