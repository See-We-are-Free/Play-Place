import styled from 'styled-components';

const ChatLogsContainer = styled.div`
	height: calc(100vh - 120px);
	display: flex;
	flex-direction: column;
	gap: 20px;
	overflow-y: scroll;

	#date {
		width: 100%;
		text-align: center;
	}
`;

export default ChatLogsContainer;
