import styled from 'styled-components';

const SongGroupContainer = styled.div`
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
		}
	}
`;

export default SongGroupContainer;
