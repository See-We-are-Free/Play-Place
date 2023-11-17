import styled, { css } from 'styled-components';

interface ChatbotModalContainerProps {
	$chatbotModal: boolean;
}

const ChatbotModalContainer = styled.div<ChatbotModalContainerProps>`
	background-color: var(--black-700);
	position: fixed;
	top: 0;
	width: 100vw;
	height: 100vh;
	transition: all 0.2s;
	z-index: var(--zindex-chatbot-modal);

	${({ $chatbotModal }) =>
		$chatbotModal
			? css`
					transform: translateY(0);
			  `
			: css`
					transform: translateY(100%);
			  `}
`;

export default ChatbotModalContainer;
