import styled, { css } from 'styled-components';

interface IconButtonWrapperProps {
	$size: 's' | 'l';
}

const IconButtonSize = {
	s: css`
		width: 30px;
		height: 30px;

		svg {
			width: 30px;
			height: 30px;
		}
	`,
	l: css`
		width: 60px;
		height: 60px;

		svg {
			width: 60px;
			height: 60px;
		}
	`,
};
const IconButtonWrapper = styled.button<IconButtonWrapperProps>`
	padding: 0;
	svg {
		fill: var(--white-100);
	}

	${({ $size }) => IconButtonSize[$size]};
`;

export default IconButtonWrapper;
