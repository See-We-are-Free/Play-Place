import Image from 'next/image';
import styled from 'styled-components';

const SongThumbnailWrapper = styled(Image)`
	border-radius: var(--radius-s);
	width: 100%;
	height: auto;
`;

export default SongThumbnailWrapper;
