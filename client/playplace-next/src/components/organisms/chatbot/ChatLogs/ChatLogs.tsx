/* eslint-disable react/no-array-index-key */
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
	const chatContainerRef = useRef<HTMLDivElement | null>(null);
	const [chatLogs, setChatLogs] = useState<ChatLogType[]>([]);
	const [recommendSongs, setRecommendSongs] = useState<Song[]>([]);
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(true);
	const [imgSrc, setImgSrc] = useState('');
	const [isDone, setIsDone] = useState(false);

	const fetchChatLogs = async () => {
		try {
			const response = await getChatLogsApi();
			if (response.status === 200) {
				setChatLogs(response.data.data);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getRecommendSongs = async () => {
		try {
			setLoading(true);
			if (imgSrc) {
				const base64WithoutHeader = imgSrc.split(',')[1];

				const blob = atob(base64WithoutHeader);
				const arrayBuffer = new ArrayBuffer(blob.length);
				const view = new Uint8Array(arrayBuffer);

				for (let i = 0; i < blob.length; i += 1) {
					view[i] = blob.charCodeAt(i);
				}

				const blobObject = new Blob([arrayBuffer], { type: 'image/png' });
				const file = new File([blobObject], 'image.png', { type: 'image/png' });

				const formData = new FormData();
				formData.append('img', file);

				const response = await getRecommendResultApi(formData);
				if (response.status === 200) {
					setMessage(response.data.data.comment);
					setRecommendSongs(response.data.data.songs);
					fetchChatLogs();
					setLoading(false);
					setIsDone(false);
					setImgSrc('');
				}
			}
		} catch (error) {
			setLoading(false);
			console.error(JSON.stringify(error));
		}
	};

	useEffect(() => {
		if (imgSrc) {
			getRecommendSongs();
		}
	}, [imgSrc]);

	useEffect(() => {
		fetchChatLogs();

		const handleGetImageData = async () => {
			const response = window.AndCamera.sendData();
			setImgSrc(`data:image/png;base64,${response}`);
			getRecommendSongs();
		};

		window.getImageData = new CustomEvent('getImageData');
		window.addEventListener('getImageData', handleGetImageData);

		return () => window.removeEventListener('getImageData', handleGetImageData);
	}, []);

	return (
		<ChatLogsContainer>
			{/* 기존 채팅 로그 */}
			{chatLogs.length ? chatLogs.map((el, idx) => <ChatLog key={idx} chatLog={el} />) : <></>}
			{/* 현재 진행중인 로그 */}
			<div id="chatting" ref={chatContainerRef}>
				<Text id="date" text={moment(new Date()).format('YYYY-MM-DD')} />
				{isDone ? (
					<></>
				) : (
					<>
						<PPChat message="안녕, 나는 플로디야. 사진을 찍어주면 어울리는 음악를 추천해줄게!" isloading={false} />
						{imgSrc ? (
							<>
								<UserChat imgSrc={imgSrc} />
								<PPChat message={message} isloading={loading} recommendedSongs={recommendSongs} />
							</>
						) : (
							<></>
						)}
					</>
				)}
			</div>
		</ChatLogsContainer>
	);
}

export default ChatLogs;
