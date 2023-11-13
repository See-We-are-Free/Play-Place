'use client';

import Logo from '@/components/atoms/Logo/Logo';
import Button from '@/components/atoms/Button/Button';
import { ButtonStyles, ContentLayoutSizes, ToastStyles } from '@/types/styles.d';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import CustomToast from '@/components/atoms/CustomToast/CustomToast';
import { getUserInfoApi } from '@/utils/api/auth';
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
		const checkLoginStatus = async () => {
			if (params.get('accessToken')) {
				console.log('accessToken', params.get('accessToken'));
				localStorage.setItem('accessToken', params.get('accessToken') || '');
				router.push('/');
			} else if (localStorage.getItem('accessToken')) {
				const loggedIn = await getUserInfoApi();
				if (loggedIn.status === 200) {
					router.push('/');
				} else {
					CustomToast(ToastStyles.error, '세션이 만료되었습니다. 로그인이 필요한 서비스입니다.');
					localStorage.removeItem('accessToken');
				}
			}
		};

		checkLoginStatus();
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
