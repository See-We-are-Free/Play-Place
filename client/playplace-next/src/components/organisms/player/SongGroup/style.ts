import styled from 'styled-components';

interface SongGroupContainerProps {
	$isFold: boolean;
}
const SongGroupContainer = styled.div<SongGroupContainerProps>`
	background-color: var(--black-500);
	border-radius: var(--radius-s);
	display: flex;
	flex-direction: column;
	gap: 15px;
	padding: 15px;

	#group-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		#group-info {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 5px;

			p {
				width: fit-content;
			}
		}

		#group-control {
			svg {
				width: 22px;
				height: auto;
			}

			#fold-btn {
				svg {
					transition: all 0.2s;
					transform: ${({ $isFold }) => ($isFold ? 'none' : 'rotateZ(-180deg);')};
				}
			}
		}
	}

	#group-songs {
		display: ${({ $isFold }) => ($isFold ? 'none' : 'block')};
	}
`;

export default SongGroupContainer;
