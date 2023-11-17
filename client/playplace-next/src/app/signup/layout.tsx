import { ReactNode } from 'react';
import { Metadata } from 'next';

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
	return <>{children}</>;
}
