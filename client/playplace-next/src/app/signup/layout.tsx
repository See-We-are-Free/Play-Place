import { ReactNode } from 'react';
import { Metadata } from 'next';
import LayoutWithHeader from '@/components/templates/layout/LayoutWithHeader/LayoutWithHeader';

interface LayoutProps {
	children: ReactNode;
}

/**
 * 페이지 별 메타데이터 설정
 */
export const metadata: Metadata = {
	title: '회원가입',
	description: 'Play, Place | 회원가입 페이지',
};

export default function SignUpLayout({ children }: LayoutProps) {
	return <LayoutWithHeader header={<header>회원가입</header>}>{children}</LayoutWithHeader>;
}
