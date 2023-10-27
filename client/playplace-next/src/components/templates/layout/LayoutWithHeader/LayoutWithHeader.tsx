'use client';

import { ReactNode } from 'react';
import { LayoutWithHeaderContainer } from './style';

interface LayoutWithHeaderProps {
	header: ReactNode;
	children: ReactNode;
	$padding?: string;
	$margin?: string;
}

export default function LayoutWithHeader({ header, children, $padding, $margin }: LayoutWithHeaderProps) {
	return (
		<>
			{header}
			<LayoutWithHeaderContainer $padding={$padding} $margin={$margin}>
				{children}
			</LayoutWithHeaderContainer>
		</>
	);
}

LayoutWithHeader.defaultProps = {
	$padding: '0',
	$margin: '0',
};
