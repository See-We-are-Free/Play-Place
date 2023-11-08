import styled from 'styled-components';

interface GroupSongListItemContainerProps {
	$isNowPlay: boolean;
}
const GroupSongListItemContainer = styled.div<GroupSongListItemContainerProps>`
	position: relative;
	display: flex;
	flex-direction: row;
	gap: 10px;
	align-items: center;
	justify-content: space-between;
	overflow: hidden;

	#song-info {
		width: 100%;
		overflow: hidden;
		display: flex;
		align-items: center;
		gap: 10px;

		#song-info-text {
			width: calc(100% - 60px);

			p {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				color: ${({ $isNowPlay }) => ($isNowPlay ? `var(--primary-orange)` : `var(--white-100)`)};
			}
		}
	}

	#more {
		width: 22px;
		height: 22px;

		svg {
			width: 22px;
			height: 22px;
		}
	}
`;

export default GroupSongListItemContainer;
