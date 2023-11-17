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
	title: '나의 정보 수정',
	description: 'Play, Place | 회원정보 수정 페이지 ',
};

export default function ChatbotLayout({ children }: LayoutProps) {
	return <Layout>{children}</Layout>;
}
