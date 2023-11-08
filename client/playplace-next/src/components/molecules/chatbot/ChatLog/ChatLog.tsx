import React from 'react';
import { ChatLogType } from '@/types/chatbot';
import Text from '@/components/atoms/Text/Text';
import ChatLogContainer from './style';
import PPChat from '../PPChat/PPChat';
import UserChat from '../UserChat/UserChat';

interface IChatLogProps {
	chatLog: ChatLogType;
}
function ChatLog(props: IChatLogProps) {
	const { chatLog } = props;
	return (
		<ChatLogContainer>
			<Text id="date" text={chatLog.date} />
			<UserChat imgSrc={chatLog.picture} />
			<PPChat message={chatLog.resultText} recommendedSongs={chatLog.resultSongs} />
		</ChatLogContainer>
	);
}

export default ChatLog;
