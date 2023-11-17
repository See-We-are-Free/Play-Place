import styled from 'styled-components';

export const AgreementDetailContainer = styled.div``;

export const TitleCotainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;

	button {
		width: 24px;
		height: 24px;
		padding: 0;

		svg {
			width: 100%;
			height: 100%;
			fill: var(--white);
		}
	}
`;

export const Title = styled.h2`
	font-size: 20px;
`;

export const Content = styled.div`
	width: 100%;
	height: calc(100vh - 130px);
	border: 1px solid var(--black-400);
	border-radius: 5px;
	padding: 10px;
	background-color: var(--black-600);
	font-size: 12px;
	overflow: scroll;
	&::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Opera*/
	}

	pre {
		text-wrap: pretty;
	}
`;
