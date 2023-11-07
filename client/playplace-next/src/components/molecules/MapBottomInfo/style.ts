import styled from 'styled-components';

const MapBottomInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const MapBottomInfoLandmarkInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	line-height: 30px;

	p {
		width: fit-content;
	}
`;

export const MapBottomInfoTitle = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
`;

export const MapBottomInfoIcon = styled.button`
	svg {
		width: 24px;
		height: 24px;
		fill: var(--white-400);
	}
`;

export const MapBottomButton = styled.button`
	margin: 10px 0px;
`;

export default MapBottomInfoContainer;
