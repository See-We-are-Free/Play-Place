'use client';

import { ReactNode } from 'react';
import Tabbar from '@/components/molecules/Tabbar/Tabbar';
import { LayoutWithHeaderAndTabbarContainer } from './style';

interface LayoutWithHeaderAndTabbarProps {
	header: ReactNode;
	children: ReactNode;
	$padding?: string;
	$margin?: string;
}

export default function LayoutWithHeaderAndTabbar(props: LayoutWithHeaderAndTabbarProps) {
	const { header, children, $padding = '0', $margin = '0' } = props;
	return (
		<>
			{header}
			<LayoutWithHeaderAndTabbarContainer $padding={$padding} $margin={$margin}>
				{children}
			</LayoutWithHeaderAndTabbarContainer>
			<Tabbar />
		</>
	);
}
