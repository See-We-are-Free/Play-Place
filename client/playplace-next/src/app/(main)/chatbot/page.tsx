'use client';

import Header from '@/components/molecules/Header/Header';
import BottomMenu from '@/components/organisms/chatbot/BottomMenu/BottomMenu';
import ChatLogs from '@/components/organisms/chatbot/ChatLogs/ChatLogs';
import ChatbotTemplate from '@/components/templates/ChatbotTemplate/ChatbotTemplate';
import LayoutWithHeader from '@/components/templates/layout/LayoutWithHeader/LayoutWithHeader';
import { HeaderStyles } from '@/types/styles.d';

function Chatbot() {
	const header = <Header $headerType={HeaderStyles.chatbot} />;
	return (
		<LayoutWithHeader header={header}>
			<ChatbotTemplate ChatLogs={<ChatLogs />} BottomMenu={<BottomMenu />} />
		</LayoutWithHeader>
	);
}

export default Chatbot;
