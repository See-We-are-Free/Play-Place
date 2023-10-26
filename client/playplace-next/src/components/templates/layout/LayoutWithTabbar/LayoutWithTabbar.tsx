'use client';

import { ReactNode } from 'react';
import { LayoutWithTabbarContainer } from './style';

interface LayoutWithTabbarProps {
	children: ReactNode;
	$padding?: string;
	$margin?: string;
}

export default function LayoutWithTabbar({ children, $padding, $margin }: LayoutWithTabbarProps) {
	return (
		<>
			<LayoutWithTabbarContainer $padding={$padding} $margin={$margin}>
				{children}
			</LayoutWithTabbarContainer>
			<>탭바</>
		</>
	);
}
