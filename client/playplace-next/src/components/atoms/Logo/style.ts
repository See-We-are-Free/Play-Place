import styled from 'styled-components';

interface ImageWrapperProps {
	width?: string;
}

const ImageWrapper = styled.div<ImageWrapperProps>`
	width: ${({ width }) => width || `100%`};
	margin: 0 auto 30px;

	img {
		width: 100%;
		height: 100%;
	}
`;

export default ImageWrapper;
