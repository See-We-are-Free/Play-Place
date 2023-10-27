'use client';

import { ReactNode } from 'react';
import Tabbar from '@/components/molecules/Tabbar/Tabbar';
import { LayoutWithTabbarContainer } from './style';

interface LayoutWithTabbarProps {
	children: ReactNode;
	$padding?: string;
	$margin?: string;
}

export default function LayoutWithTabbar(props: LayoutWithTabbarProps) {
	const { children, $padding = '0', $margin = '0' } = props;
	return (
		<>
			<LayoutWithTabbarContainer $padding={$padding} $margin={$margin}>
				{children}
			</LayoutWithTabbarContainer>
			<Tabbar />
		</>
	);
}
