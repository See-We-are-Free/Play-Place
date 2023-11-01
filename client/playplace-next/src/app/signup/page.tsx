'use client';

import Header from '@/components/molecules/Header/Header';
import JoinAgreement from '@/components/organisms/JoinAgreement/JoinAgreement';
import JoinInfo from '@/components/organisms/JoinInfo/JoinInfo';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import LayoutWithHeader from '@/components/templates/layout/LayoutWithHeader/LayoutWithHeader';
import { ContentLayoutSizes, HeaderStyles } from '@/types/styles.d';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function SignUp() {
	const params = useSearchParams();
	const router = useRouter();
	const [step, setStep] = useState(0);
	const [email, setEmail] = useState<string | null>(null);
	const header = <Header $headerType={HeaderStyles.signup} />;

	useEffect(() => {
		if (!email) {
			if (params.get('email')) {
				setEmail(params.get('email'));
			} else {
				alert('잘못된 접근입니다.');
				router.push('/');
			}
		}
	}, [email, params, router]);

	if (!email) {
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
						<JoinInfo />
					</ContentLayout>
				)}
			</ContentLayout>
		</LayoutWithHeader>
	);
}

export default SignUp;
