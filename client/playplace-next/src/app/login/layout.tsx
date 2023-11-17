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
	title: '로그인',
	description: 'Play, Place | 로그인 페이지',
};

export default function LoginLayout({ children }: LayoutProps) {
	return <Layout $margin="0 auto">{children}</Layout>;
}
