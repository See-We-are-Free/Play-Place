import styled from 'styled-components';

export const RadarShareOnContainer = styled.div`
	position: relative;
	height: 100%;
	overflow: hidden;

	button {
		position: absolute;
		top: 10px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
		background: var(--primary-grandiant-main);
		padding: 4px 8px;
		border-radius: 50px;
		z-index: 1;

		svg {
			width: 20px;
			height: 20px;
			fill: var(--white);
		}
	}
`;

export const BackgroundContainer = styled.div`
	position: absolute;
	top: 55%;
	left: 50%;
	transform: translate(-50%, -55%);
`;

export const UserContainer = styled.div`
	display: inline-block;
	text-align: center;

	p {
		margin: 0 auto;
	}
`;

export const EmojiWrapper = styled.div``;

export const BackgorundRound = styled.div`
	width: 150px;
	height: 150px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: -1;
	border: 1px solid var(--black-400);
	border-radius: 100%;

	&::before,
	&::after {
		content: '';
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: -1;
		border: 1px solid var(--black-400);
		border-radius: 100%;
	}

	&::before {
		width: 300px;
		height: 300px;
	}

	&::after {
		width: 450px;
		height: 450px;
	}
`;
