import styled from 'styled-components';

const MypageSettingContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px;
`;

export const Line = styled.div`
	width: 100%;
	height: 0.3px;
	background-color: var(--white-800);
	margin: 10px 0;
`;

export const MypagetSettingText = styled.div`
	padding: 10px;

	& > p {
		color: var(--white-600);
	}
`;

export default MypageSettingContainer;
