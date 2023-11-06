'use client';

import React from 'react';
import Text from '@/components/atoms/Text/Text';
import ArrowButtonWrapper from './style';

interface IArrowButtonProps {
	text: string;
	onClick: () => void;
}
function ArrowButton(props: IArrowButtonProps) {
	const { text, onClick } = props;

	return (
		<ArrowButtonWrapper type="button" onClick={onClick}>
			<Text text={text} />
		</ArrowButtonWrapper>
	);
}

export default ArrowButton;
