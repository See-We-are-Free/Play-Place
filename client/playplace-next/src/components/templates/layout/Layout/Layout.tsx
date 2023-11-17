'use client';

import { ReactNode } from 'react';
import { LayoutContainer } from './style';

interface LayoutProps {
	children: ReactNode;
	$padding?: string;
	$margin?: string;
	$background?: string;
}

export default function Layout(props: LayoutProps) {
	const { children, $padding, $margin = '0', $background = '0' } = props;
	return (
		<LayoutContainer $padding={$padding} $margin={$margin} $background={$background}>
			{children}
		</LayoutContainer>
	);
}
