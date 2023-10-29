import styled from 'styled-components';

const HomeAlbumContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export const HomeAlbumTitle = styled.span`
	margin-top: 10px;
	font-size: 16px;
	color: var(--white-100);
`;

export const HomeAlbumArtist = styled.span`
	font-size: 12px;
	color: var(--white-500);
`;

export default HomeAlbumContainer;
