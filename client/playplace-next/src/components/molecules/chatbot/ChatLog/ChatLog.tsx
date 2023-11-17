import React from 'react';
import { ChatLogType } from '@/types/chatbot';
import Text from '@/components/atoms/Text/Text';
import moment from 'moment';
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
			<Text id="date" text={moment(chatLog.answerDate).format('YYYY-MM-DD')} />
			<UserChat imgSrc={chatLog.imgUrl} />
			<PPChat message={chatLog.comment} recommendedSongs={chatLog.songs} isloading={false} />
		</ChatLogContainer>
	);
}

export default ChatLog;
