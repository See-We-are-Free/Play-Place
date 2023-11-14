import React, { forwardRef } from 'react';
import TextWrapper from './style';

interface ITextProps {
	id?: string;
	text: string;
	fontSize?: number;
	color?: 'default' | 'gradientMain' | 'gray' | 'gradientOrange';
	onClick?: () => void;
	$overflowHidden?: boolean;
	$textSlide?: boolean;
}

const Text = forwardRef<HTMLParagraphElement, ITextProps>((props, ref) => {
	const {
		id = '',
		text,
		onClick = () => {},
		color = 'default',
		fontSize = 12,
		$overflowHidden = false,
		$textSlide = false,
	} = props;

	return (
		<TextWrapper
			ref={ref}
			id={id}
			$fontSize={fontSize}
			$color={color}
			onClick={onClick}
			$overflowHidden={$overflowHidden}
			$textSlide={$textSlide}
		>
			{text}
		</TextWrapper>
	);
});

Text.displayName = 'Text';

export default Text;
