import { ReactNode } from 'react';
import { Metadata } from 'next';

interface LayoutProps {
	children: ReactNode;
}

/**
 * 페이지 별 메타데이터 설정
 */
export const metadata: Metadata = {
	title: '검색',
	description: 'Play, Place | 검색 페이지',
};

export default function SearchLayout({ children }: LayoutProps) {
	return <>{children}</>;
}
