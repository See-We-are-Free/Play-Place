import React, { useEffect, useRef, useState } from 'react';
import PPChat from '@/components/molecules/chatbot/PPChat/PPChat';
import UserChat from '@/components/molecules/chatbot/UserChat/UserChat';
import { getChatLogsApi } from '@/utils/api/chatbot';
import { ChatLogType } from '@/types/chatbot';
import ChatLog from '@/components/molecules/chatbot/ChatLog/ChatLog';
import { dummyChatLogs } from '@/constants/dummy';
import Text from '@/components/atoms/Text/Text';
import moment from 'moment';
import ChatLogsContainer from './style';

function ChatLogs() {
	const [chatLogs, setChatLogs] = useState<ChatLogType[]>([]);
	const chatContainerRef = useRef<HTMLDivElement | null>(null);

	const fetchChatLogs = async () => {
		try {
			const response = await getChatLogsApi();
			console.log(response);
			if (response.status === 200) {
				setChatLogs(response.data);
			}
		} catch (error) {
			console.error(error);
			setChatLogs(dummyChatLogs);
		}
	};

	useEffect(() => {
		fetchChatLogs();
	}, []);

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [chatLogs]);

	return (
		<ChatLogsContainer>
			{/* 기존 채팅 로그 */}
			{chatLogs.length ? chatLogs.map((el) => <ChatLog key={el.id} chatLog={el} />) : <></>}
			{/* 현재 진행중인 로그 */}
			<div id="chatting" ref={chatContainerRef}>
				<Text id="date" text={moment(new Date()).format('YYYY-MM-DD')} />
				<PPChat message="안녕하세요 플플! 사진을 찍어주시면 적당한 노래를 추천해드릴게요!" />
				<UserChat message="응 안녕응 안녕응 안녕응 안녕응 안녕응 안녕응 안녕응 안녕응 안녕응 안녕응 안녕응 안녕응 안녕응 안녕응 안녕응 안녕응 안녕응 안녕응 안녕응 안녕" />
			</div>
		</ChatLogsContainer>
	);
}

export default ChatLogs;
