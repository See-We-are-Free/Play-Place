import React, { useEffect, useRef, useState } from 'react';
import PPChat from '@/components/molecules/chatbot/PPChat/PPChat';
import UserChat from '@/components/molecules/chatbot/UserChat/UserChat';
import { getChatLogsApi, getRecommendResultApi } from '@/utils/api/chatbot';
import { ChatLogType } from '@/types/chatbot';
import ChatLog from '@/components/molecules/chatbot/ChatLog/ChatLog';
import Text from '@/components/atoms/Text/Text';
import moment from 'moment';
import { Song } from '@/types/songs';
import ChatLogsContainer from './style';

function ChatLogs() {
	const [chatLogs, setChatLogs] = useState<ChatLogType[]>([]);
	const chatContainerRef = useRef<HTMLDivElement | null>(null);
	const [recommendSongs, setRecommendSongs] = useState<Song[]>([]);
	const [loading, setLoading] = useState(true);
	const [imgSrc, setImgSrc] = useState('');
	const [message, setMessage] = useState('');

	const getRecommendSongs = async () => {
		try {
			if (imgSrc) {
				// Base64 문자열에서 "data:image/png;base64," 부분을 제거합니다.
				const base64WithoutHeader = imgSrc.split(',')[1];

				// Base64 문자열을 Blob으로 디코딩합니다.
				const blob = atob(base64WithoutHeader);
				const arrayBuffer = new ArrayBuffer(blob.length);
				const view = new Uint8Array(arrayBuffer);
				for (let i = 0; i < blob.length; i += 1) {
					view[i] = blob.charCodeAt(i);
				}

				// Blob을 생성합니다.
				const blobObject = new Blob([arrayBuffer], { type: 'image/png' });

				// Blob 객체를 사용하여 File 객체를 생성합니다.
				const file = new File([blobObject], 'image.png', { type: 'image/png' });

				const formData = new FormData();
				formData.append('img', file);

				const response = await getRecommendResultApi(formData);
				if (response.status === 200) {
					setMessage(response.data.data.comment);
					setRecommendSongs(response.data.data.songs);
					setLoading(false);
				}
				console.log(JSON.stringify(response));
			}
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	};

	const fetchChatLogs = async () => {
		try {
			const response = await getChatLogsApi();
			if (response.status === 200) {
				setChatLogs(response.data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchChatLogs();

		const handleGetImageData = async () => {
			const response = window.AndCamera.sendData();
			setImgSrc(`data:image/png;base64,${response}`);
		};

		window.getImageData = new CustomEvent('getImageData');
		window.addEventListener('getImageData', handleGetImageData);

		return () => window.removeEventListener('getImageData', handleGetImageData);
	}, []);

	return (
		<ChatLogsContainer>
			{/* 기존 채팅 로그 */}
			{chatLogs.length ? chatLogs.map((el) => <ChatLog key={el.id} chatLog={el} />) : <></>}
			{/* 현재 진행중인 로그 */}
			<div id="chatting" ref={chatContainerRef}>
				<Text id="date" text={moment(new Date()).format('YYYY-MM-DD')} />
				<button type="button" onClick={getRecommendSongs}>
					{' '}
					크릭해바
				</button>
				<PPChat message="안녕하세요! 사진을 찍어주시면 적당한 노래를 추천해드릴게요!" isloading={false} />
				{imgSrc ? <UserChat imgSrc={imgSrc} /> : <></>}
				<PPChat message={message} isloading={loading} recommendedSongs={recommendSongs} />
			</div>
		</ChatLogsContainer>
	);
}

export default ChatLogs;
