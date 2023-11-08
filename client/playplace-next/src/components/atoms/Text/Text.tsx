import React from 'react';
import TextWrapper from './style';

interface ITextProps {
	id?: string;
	text: string;
	fontSize?: number;
	color?: 'default' | 'gradientMain' | 'gray' | 'gradientOrange';
	onClick?: () => void;
	$overflowHidden?: boolean;
}

function Text(props: ITextProps) {
	const { id = '', text, onClick = () => {}, color = 'default', fontSize = 12, $overflowHidden = true } = props;

	return (
		<TextWrapper id={id} $fontSize={fontSize} $color={color} onClick={onClick} $overflowHidden={$overflowHidden}>
			{text}
		</TextWrapper>
	);
}

export default Text;
