import { ReactNode } from 'react';
import { Metadata } from 'next';
import LayoutWithHeaderAndTabbar from '@/components/templates/layout/LayoutWithHeaderAndTabbar/LayoutWithHeaderAndTabbar';

interface LayoutProps {
	children: ReactNode;
}

/**
 * 페이지 별 메타데이터 설정
 */
export const metadata: Metadata = {
	title: '플레이더',
	description: 'Play, Place | 플레이더 페이지',
};

export default function RadarLayout({ children }: LayoutProps) {
	return <LayoutWithHeaderAndTabbar header={<header>헤더</header>}>{children}</LayoutWithHeaderAndTabbar>;
}
