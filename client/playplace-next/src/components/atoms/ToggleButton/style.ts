import styled, { css } from 'styled-components';

interface ButtonProps {
	$isActive: boolean | null;
}

const ButtonStyles = {
	true: css`
		background: var(--primary-grandiant-main);
		&::before {
			left: calc(100% - 18px);
		}
	`,
	false: css`
		background: var(--white-300);
		&::before {
			left: 2px;
		}
	`,
};

export const ToggleButtonWrapper = styled.div`
	display: flex;
`;

export const Button = styled.button<ButtonProps>`
	width: 32px;
	height: 18px;
	border-radius: 50px;
	position: relative;
	background: var(--primary-grandiant-main);

	&::before {
		content: '';
		width: 16px;
		height: 14px;
		border-radius: 50px;
		background-color: var(--white);
		position: absolute;
		top: 50%;
		left: calc(100% - 18px);
		transform: translateY(-50%);
		transition: all 0.2s;
	}

	${({ $isActive }) => $isActive !== null && ButtonStyles[`${$isActive}`]}
`;
