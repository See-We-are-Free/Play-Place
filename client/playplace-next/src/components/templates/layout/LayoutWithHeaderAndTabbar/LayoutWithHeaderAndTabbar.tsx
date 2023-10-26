'use client';

import { ReactNode } from 'react';
import { LayoutWithHeaderAndTabbarContainer } from './style';

interface LayoutWithHeaderAndTabbarProps {
	header: ReactNode;
	children: ReactNode;
	$padding?: string;
	$margin?: string;
}

export default function LayoutWithHeaderAndTabbar({
	header,
	children,
	$padding,
	$margin,
}: LayoutWithHeaderAndTabbarProps) {
	return (
		<>
			{header}
			<LayoutWithHeaderAndTabbarContainer $padding={$padding} $margin={$margin}>
				{children}
			</LayoutWithHeaderAndTabbarContainer>
			<>탭바</>
		</>
	);
}
