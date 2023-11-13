import styled from 'styled-components';

const PPChatContainer = styled.div`
	margin: 10px;
	display: flex;
	flex-direction: row;
	gap: 10px;

	#logo {
		background-color: var(--white-100);
		padding: 5px;
		min-width: 35px;
		width: 35px;
		height: 35px;
		border-radius: var(--radius-l);
	}

	#loading {
		background: var(--primary-grandiant-sub-puple);
		border-radius: var(--radius-s);
	}
	#message {
		max-width: 70%;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 10px;
		background: var(--primary-grandiant-sub-puple);
		border-radius: var(--radius-s);

		p {
			font-size: 14px;
		}
	}

	#recommended-songs {
		display: flex;
		flex-direction: column;
		gap: 10px;

		img {
			width: 45px;
			height: 45px;
		}
	}
`;

export default PPChatContainer;
