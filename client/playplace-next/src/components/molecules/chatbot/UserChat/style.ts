import styled from 'styled-components';

const UserChatWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: end;
	margin: 10px;

	#message {
		max-width: 70%;
		display: flex;
		border-radius: var(--radius-s);
		padding: 10px;
		background: var(--primary-grandiant-sub-orange);
		aspect-ratio: 1/1;

		p {
			font-size: 14px;
		}

		img {
			width: 200px;
			height: 200px;
		}
	}
`;

export default UserChatWrapper;
