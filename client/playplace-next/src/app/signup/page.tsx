'use client';

import CustomToast from '@/components/atoms/CustomToast/CustomToast';
import Header from '@/components/molecules/Header/Header';
import JoinAgreement from '@/components/organisms/JoinAgreement/JoinAgreement';
import JoinInfo from '@/components/organisms/JoinInfo/JoinInfo';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import LayoutWithHeader from '@/components/templates/layout/LayoutWithHeader/LayoutWithHeader';
import { ContentLayoutSizes, HeaderStyles, ToastStyles } from '@/types/styles.d';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function SignUp() {
	const params = useSearchParams();
	const router = useRouter();
	const [step, setStep] = useState(0);
	const [email, setEmail] = useState<string | null>(null);
	const [googleToken, setGoogleToken] = useState<string | null>(null);
	const header = <Header $headerType={HeaderStyles.signup} />;

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken) {
			localStorage.removeItem('accessToken');
		}
	}, []);

	useEffect(() => {
		if (!email && !googleToken) {
			if (params.get('email') && params.get('googleToken')) {
				setEmail(params.get('email'));
				setGoogleToken(params.get('googleToken'));
			} else {
				CustomToast(ToastStyles.noTabbarError, '잘못된 접근입니다. 로그인 페이지로 이동합니다.');
				router.push('/login');
			}
		}
	}, [email, googleToken, params, router]);

	if (!email || !googleToken) {
		return <></>;
	}

	return (
		<LayoutWithHeader header={header}>
			<ContentLayout size={ContentLayoutSizes.md}>
				{step === 0 ? (
					<ContentLayout>
						<JoinAgreement handleNextStep={setStep} />
					</ContentLayout>
				) : (
					<ContentLayout>
						<JoinInfo email={email} googleToken={googleToken} />
					</ContentLayout>
				)}
			</ContentLayout>
		</LayoutWithHeader>
	);
}

export default SignUp;
