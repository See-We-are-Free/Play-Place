'use client';

import chatbotModalState from '@/recoil/chatbot';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Chatbot from '@/app/(main)/chatbot/page';
import ChatbotModalContainer from './style';

function ChatbotModal() {
	const [chatbotModal, setChatbotModal] = useRecoilState(chatbotModalState);

	const openChatbot = () => {
		setChatbotModal(true);
	};

	useEffect(() => {
		window.openChatbot = new CustomEvent('openChatbot');
		window.addEventListener('openChatbot', openChatbot);

		return () => window.removeEventListener('openChatbot', openChatbot);
	}, []);

	return (
		<ChatbotModalContainer $chatbotModal={chatbotModal}>
			<Chatbot />
		</ChatbotModalContainer>
	);
}

export default ChatbotModal;
