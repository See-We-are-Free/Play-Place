import React from 'react';
import PPChat from '@/components/molecules/chatbot/PPChat/PPChat';
import UserChat from '@/components/molecules/chatbot/UserChat/UserChat';
import ChatLogsContainer from './style';

function ChatLogs() {
	return (
		<ChatLogsContainer>
			<PPChat message="안녕?" />
			<UserChat message="응 안녕" />
		</ChatLogsContainer>
	);
}

export default ChatLogs;
