'use client';

import { ReactNode } from 'react';
import { LayoutContainer } from './style';

interface LayoutProps {
	children: ReactNode;
	$padding?: string;
	$margin?: string;
	$background?: string;
}

export default function Layout({ children, $padding, $margin, $background }: LayoutProps) {
	return (
		<LayoutContainer $padding={$padding} $margin={$margin} $background={$background}>
			{children}
		</LayoutContainer>
	);
}
