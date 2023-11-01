import styled, { css } from 'styled-components';

interface IconButtonWrapperProps {
	$size: 's' | 'm' | 'l';
	$color: 'white100' | 'black300';
}

const IconButtonSize = {
	s: css`
		width: 30px;
		height: 30px;
	`,
	m: css`
		width: 35px;
		height: 35px;
	`,
	l: css`
		width: 50px;
		height: 50px;
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

	svg {
		width: 100%;
		height: 100%;
	}

	img {
		width: 100%;
		height: 100%;
	}

	${({ $color }) => IconButtonColor[$color]};
	${({ $size }) => IconButtonSize[$size]};
`;

export default IconButtonWrapper;
