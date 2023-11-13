import React, { useEffect, useRef, useState } from 'react';
import PPChat from '@/components/molecules/chatbot/PPChat/PPChat';
import UserChat from '@/components/molecules/chatbot/UserChat/UserChat';
import { getChatLogsApi } from '@/utils/api/chatbot';
import { ChatLogType } from '@/types/chatbot';
import ChatLog from '@/components/molecules/chatbot/ChatLog/ChatLog';
import Text from '@/components/atoms/Text/Text';
import moment from 'moment';
import { dummyChatLogs } from '@/constants/dummy';
import ChatLogsContainer from './style';

function ChatLogs() {
	const [chatLogs, setChatLogs] = useState<ChatLogType[]>([]);
	const chatContainerRef = useRef<HTMLDivElement | null>(null);
	const [imgSrc, setImgSrc] = useState('');

	// const scrollToBottom = () => {
	// 	if (chatContainerRef.current) {
	// 		chatContainerRef.current.scrollTop = 10000;
	// 	}
	// };

	/*
		// const cameraButton = () => {
	// 	window.AndCamera.openCamera();
	// };

	// const cameraResponse = window.AndCamera.sendData();

	// const [imgSrc, setImageSrc] = useState<string>('');

	// function receiveImageData(encodedImageData: string) {
	// 	setImageSrc(`data:image/png;base64,${encodedImageData}`);
	// }

	// useEffect(() => {
	// 	if (cameraResponse) {
	// 		receiveImageData(cameraResponse);
	// 	}
	// }, [cameraResponse]);
	*/

	const fetchChatLogs = async () => {
		try {
			const response = await getChatLogsApi();
			setChatLogs(dummyChatLogs);
			if (response.status === 200) {
				setChatLogs(response.data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const updateNowChatLog = async () => {
		const response = window.AndCamera.sendData();
		setImgSrc(`data:image/png;base64,${response}`);
	};

	useEffect(() => {
		const handleTakePicture = async () => {
			await updateNowChatLog();
		};

		window.takePicture = new CustomEvent('takePicture');
		window.addEventListener('takePicture', handleTakePicture);

		return () => window.removeEventListener('takePicture', handleTakePicture);
	}, [chatLogs]);

	useEffect(() => {
		fetchChatLogs();
	}, []);

	return (
		<ChatLogsContainer>
			{/* 기존 채팅 로그 */}
			{chatLogs.length ? chatLogs.map((el) => <ChatLog key={el.id} chatLog={el} />) : <></>}
			{/* 현재 진행중인 로그 */}
			<div id="chatting" ref={chatContainerRef}>
				<Text id="date" text={moment(new Date()).format('YYYY-MM-DD')} />
				<PPChat message="안녕하세요 플플! 사진을 찍어주시면 적당한 음악를 추천해드릴게요!" />
				<UserChat imgSrc={imgSrc} />
				<span>{imgSrc}</span>
			</div>
		</ChatLogsContainer>
	);
}

export default ChatLogs;
