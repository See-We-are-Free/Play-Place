import React from 'react';
import TextWrapper from './style';

interface ITextProps {
	text: string;
	fontSize?: number;
	color?: 'default' | 'gradientMain' | 'gray' | 'gradientOrange';
	onClick?: () => void;
	$overflowHidden?: boolean;
}

function Text(props: ITextProps) {
	const { text, onClick = () => {}, color = 'default', fontSize = 12, $overflowHidden = true } = props;

	return (
		<TextWrapper $fontSize={fontSize} $color={color} onClick={onClick} $overflowHidden={$overflowHidden}>
			{text}
		</TextWrapper>
	);
}

export default Text;
