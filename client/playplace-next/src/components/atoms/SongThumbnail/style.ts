import Image from 'next/image';
import styled from 'styled-components';

interface SongThumbnailWrapperProps {
	$width: number;
	$height: number;
}

const SongThumbnailWrapper = styled.div<SongThumbnailWrapperProps>`
	width: ${({ $width }) => $width || 45}px;
	height: ${({ $height }) => $height || 45}px;
`;

export const SongThumbnailImage = styled(Image)`
	border-radius: var(--radius-s);
	width: 100%;
	height: 100%;
`;

export default SongThumbnailWrapper;
