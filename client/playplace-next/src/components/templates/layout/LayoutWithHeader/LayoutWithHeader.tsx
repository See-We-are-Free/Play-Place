'use client';

import { ReactNode } from 'react';
import { LayoutWithHeaderContainer } from './style';

interface LayoutWithHeaderProps {
	header: ReactNode;
	children: ReactNode;
	$padding?: string;
	$margin?: string;
}

export default function LayoutWithHeader(props: LayoutWithHeaderProps) {
	const { header, children, $padding = '0', $margin = '0' } = props;
	return (
		<>
			{header}
			<LayoutWithHeaderContainer $padding={$padding} $margin={$margin}>
				{children}
			</LayoutWithHeaderContainer>
		</>
	);
}
