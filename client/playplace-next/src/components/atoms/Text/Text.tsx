import React from 'react';
import TextWrapper from './style';

interface ITextProps {
	text: string;
	fontSize?: number;
	color?: 'default' | 'gradientMain' | 'gray' | 'gradientOrange';
	onClick?: () => void;
}

function Text(props: ITextProps) {
	const { text, onClick = () => {}, color = 'default', fontSize = 12 } = props;

	return (
		<TextWrapper $fontSize={fontSize} $color={color} onClick={onClick}>
			{text}
		</TextWrapper>
	);
}

export default Text;
