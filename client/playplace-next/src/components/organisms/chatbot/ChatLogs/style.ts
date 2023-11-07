import styled from 'styled-components';

const ChatLogsContainer = styled.div`
	height: calc(100vh - 120px);
	display: flex;
	flex-direction: column;
	gap: 20px;

	#date {
		text-align: center;
	}
`;

export default ChatLogsContainer;
