'use client';

import Logo from '@/components/atoms/Logo/Logo';
import Button from '@/components/atoms/Button/Button';
import { ButtonStyles, ContentLayoutSizes } from '@/types/styles.d';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import ContentLayout from '../layout/ContentLayout/ContentLayout';
import LoginContainer from './style';

const LOGIN_PATH = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_PATH || '';
// const LOGIN_PATH = process.env.NEXT_PUBLIC_DEVELOP_GOOGLE_LOGIN_PATH || ''; // 개발용

function LoginTemplate() {
	const params = useSearchParams();
	const router = useRouter();

	const login = () => {
		console.log('로그인', LOGIN_PATH);
		if (LOGIN_PATH !== '') {
			router.push(LOGIN_PATH);
		}
	};

	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			localStorage.removeItem('accessToken');
		}

		if (params.get('accessToken')) {
			// TODOS: 토큰 저장
			console.log('accessToken', params.get('accessToken'));
			// alert('가입된 회원입니다. 메인 페이지로 이동합니다.');
			localStorage.setItem('accessToken', params.get('accessToken') || '');
			router.push('/');
		}
	}, [params, router]);

	return (
		<ContentLayout size={ContentLayoutSizes.lg}>
			<LoginContainer>
				<Logo width="80%" />
				<Button content="Google로 시작하기" buttonType={ButtonStyles.outlinePrimaryLogin} onClick={login} socialImg>
					로그인
				</Button>
			</LoginContainer>
		</ContentLayout>
	);
}

export default LoginTemplate;
