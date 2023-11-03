import React, { ReactNode } from 'react';
import ChatbotTemplateContainer from './style';

interface IChatbotTemplateProps {
	ChatLogs: ReactNode;
	BottomMenu: ReactNode;
}

function ChatbotTemplate(props: IChatbotTemplateProps) {
	const { ChatLogs, BottomMenu } = props;

	return (
		<ChatbotTemplateContainer>
			<div id="chat-logs">{ChatLogs}</div>
			<div id="bottom-menu">{BottomMenu}</div>
		</ChatbotTemplateContainer>
	);
}

export default ChatbotTemplate;
