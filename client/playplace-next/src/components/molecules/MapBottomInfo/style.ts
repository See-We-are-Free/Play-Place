import styled from 'styled-components';

const MapBottomInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const MapBottomInfoLandmarkInfo = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const MapBottomInfoTitle = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

export const MapBottomInfoIcon = styled.button`
	svg {
		width: 24px;
		height: 24px;
	}
`;
export default MapBottomInfoContainer;
