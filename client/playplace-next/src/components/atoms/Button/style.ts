import Image from 'next/image';
import styled, { css } from 'styled-components';

interface ICommonButtonStyleProps {
	buttontype: 'primary' | 'outlinePrimary' | 'success' | 'cancel';
}

const ButtonTypes = {
	primary: css`
		background: var(--primary-grandiant-main);
		height: 35px;
		font-size: 13px;
	`,
	outlinePrimary: css`
		font-size: 14px;
		height: 100px;
		border: 1px solid transparent;
		background-image: linear-gradient(#222222, #222222),
			linear-gradient(90deg, #feac5e 0%, #c779d0 25.52%, #4bc0c8 100%);
		background-origin: border-box;
		background-clip: content-box, border-box;
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
	${({ buttontype }) => ButtonTypes[buttontype]}
`;

export const SocialImage = styled(Image)`
	width: 20px;
	height: 20px;
`;
