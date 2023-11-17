import styled from 'styled-components';

const EmojiListWrapper = styled.div`
	margin-bottom: 20px;
	width: calc(100% + 40px);
	left: -20px;
	position: absolute;
	overflow: scroll;
	&::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera*/
	}

	ul {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		gap: 10px;
	}
`;

export default EmojiListWrapper;
