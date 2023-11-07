import styled from 'styled-components';

export const MarkerDetailInfoHeader = styled.div`
	display: flex;
	flex-direction: row;
	gap: 4px;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 10px;

	svg {
		width: 22px;
		height: 22px;
		margin-right: 6px;
	}

	span:last-child {
		font-size: 16px;
	}
`;

export const NicknameWrapper = styled.span`
	font-size: 20px;
`;

export const MarkerDetailInfoBody = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
	margin: 0 10px;
`;

export const BottomSheetImageWrapper = styled.div`
	width: 60px;
	height: 60px;
	border-radius: 10px;
	overflow: hidden;

	img {
		width: 100%;
		height: 100%;
	}
`;

export const Info = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const Title = styled.p`
	font-size: 20px;
`;

export const Artist = styled.p`
	font-size: 14px;
	color: var(--white-500);
`;
