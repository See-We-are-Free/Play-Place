'use client';

import React from 'react';
import Text from '@/components/atoms/Text/Text';

interface IArrowButtonProps {
	text: string;
	onClick: () => void;
}
function ArrowButton(props: IArrowButtonProps) {
	const { text, onClick } = props;

	return (
		<button type="button" onClick={onClick}>
			<Text text={text} />
		</button>
	);
}

export default ArrowButton;
