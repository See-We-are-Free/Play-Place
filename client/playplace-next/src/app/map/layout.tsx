import { ReactNode } from 'react';
import { Metadata } from 'next';
import LayoutWithTabbar from '@/components/templates/layout/LayoutWithTabbar/LayoutWithTabbar';

interface LayoutProps {
	children: ReactNode;
}

/**
 * 페이지 별 메타데이터 설정
 */
export const metadata: Metadata = {
	title: '플레이맵',
	description: 'Play, Place | 플레이맵 페이지',
};

export default function MapLayout({ children }: LayoutProps) {
	return <LayoutWithTabbar>{children}</LayoutWithTabbar>;
}
