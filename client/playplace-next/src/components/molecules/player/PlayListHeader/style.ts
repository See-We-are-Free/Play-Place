import styled from 'styled-components';

const PlayListHeaderContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	#title-text {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
`;

export default PlayListHeaderContainer;
