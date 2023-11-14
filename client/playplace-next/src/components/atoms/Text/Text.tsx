import React from 'react';
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

function Text(props: ITextProps) {
	const {
		id = '',
		text,
		onClick = () => {},
		color = 'default',
		fontSize = 12,
		$overflowHidden = true,
		$textSlide = false,
	} = props;

	return (
		<TextWrapper
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
}

export default Text;
