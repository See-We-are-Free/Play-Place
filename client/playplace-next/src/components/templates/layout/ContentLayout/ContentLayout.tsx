'use client';

import { ReactNode } from 'react';
import { ContentLayoutSizes } from '@/types/styles.d';
import { ContentLayoutWrapper } from './style';

interface ContentLayoutProps {
	children: ReactNode;
	size?: ContentLayoutSizes;
	$padding?: string;
	$margin?: string;
	$background?: string;
	$border?: string;
	$borderRadius?: number;
}

export default function ContentLayout(props: ContentLayoutProps) {
	const { children, size, $padding, $margin = '0', $background = 'transparent', $border, $borderRadius = 0 } = props;

	return (
		<ContentLayoutWrapper
			size={size}
			$padding={$padding}
			$margin={$margin}
			$background={$background}
			$border={$border}
			$borderRadius={$borderRadius}
		>
			{children}
		</ContentLayoutWrapper>
	);
}
