import styled from 'styled-components';

const MapBottomInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const MapBottomInfoLandmarkInfo = styled.div`
	display: flex;
	gap: 10px;
	align-items: end;
	text-wrap: nowrap;
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
