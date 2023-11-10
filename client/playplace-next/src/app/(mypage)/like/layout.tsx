import { ReactNode } from 'react';
import { Metadata } from 'next';
import Layout from '@/components/templates/layout/Layout/Layout';

interface LayoutProps {
	children: ReactNode;
}

/**
 * 페이지 별 메타데이터 설정
 */
export const metadata: Metadata = {
	title: '좋아요 곡',
	description: 'Play, Place | 좋아요 곡 페이지 ',
};

export default function ChatbotLayout({ children }: LayoutProps) {
	return <Layout>{children}</Layout>;
}
