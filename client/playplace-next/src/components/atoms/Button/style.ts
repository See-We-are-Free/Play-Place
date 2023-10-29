import { ButtonStyles } from '@/types/styles.d';
import Image from 'next/image';
import styled, { css } from 'styled-components';

interface ICommonButtonStyleProps {
	$buttonType: ButtonStyles;
}

const ButtonTypes = {
	primary: css`
		background: var(--primary-grandiant-main);
		height: 35px;
		font-size: 13px;
	`,
	outlinePrimary: css`
		font-size: 14px;
		height: 50px;
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;

		&::before,
		&::after {
			content: '';
			display: block;
			border-radius: 5px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: -1;
		}
		&::before {
			background: var(--primary-grandiant-main);
			width: 100%;
			height: 100%;
		}
		&::after {
			background: var(--black-500);
			width: calc(100% - 2px);
			height: calc(100% - 2px);
		}
	`,
	outlinePrimaryLogin: css`
		height: 50px;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 8px;

		img,
		span {
			position: relative;
			z-index: 1;
			font-size: 14px;
		}

		&::before,
		&::after {
			content: '';
			display: block;
			border-radius: 5px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		&::before {
			background: var(--primary-grandiant-main);
			width: calc(100% - 20px);
			height: 100%;
		}
		&::after {
			background: var(--black-500);
			width: calc(100% - 22px);
			height: calc(100% - 2px);
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
		}
	`,
	success: css`
		background: var(--primary-grandiant-sub-puple);
		height: 50px;
		font-size: 10px;
	`,
	cancel: css`
		background: var(--black-400);
		height: 50px;
		font-size: 10px;
	`,
};

export const ButtonContainer = styled.button<ICommonButtonStyleProps>`
	color: var(--white);
	border-radius: var(--radius-s);
	width: var(--content-width-full);
	${({ $buttonType }) => ButtonTypes[$buttonType]}
`;

export const SocialImage = styled(Image)`
	width: 20px;
	height: 20px;
`;
