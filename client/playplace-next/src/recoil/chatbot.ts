import { ChatbotModalType } from '@/types/chatbot';
import { atom } from 'recoil';

const chatbotModalState = atom<ChatbotModalType>({
	key: 'chatbotModalState',
	default: false,
});

export default chatbotModalState;
