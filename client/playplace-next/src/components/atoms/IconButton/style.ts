import styled, { css } from 'styled-components';

interface IconButtonWrapperProps {
	$size: 's' | 'l';
	$color: 'white100' | 'black300';
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

const IconButtonColor = {
	black300: css`
		svg {
			fill: var(--black-300);
		}
	`,
	white100: css`
		svg {
			fill: var(--white-100);
		}
	`,
};

const IconButtonWrapper = styled.button<IconButtonWrapperProps>`
	padding: 0;

	${({ $color }) => IconButtonColor[$color]};
	${({ $size }) => IconButtonSize[$size]};
`;

export default IconButtonWrapper;
