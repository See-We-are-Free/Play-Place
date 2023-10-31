'use client';

import Header from '@/components/molecules/Header/Header';
import JoinAgreement from '@/components/organisms/JoinAgreement/JoinAgreement';
import JoinInfo from '@/components/organisms/JoinInfo/JoinInfo';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import LayoutWithHeader from '@/components/templates/layout/LayoutWithHeader/LayoutWithHeader';
import { ContentLayoutSizes, HeaderStyles } from '@/types/styles.d';

function SignUp() {
	const header = <Header $headerType={HeaderStyles.signup} />;

	return (
		<LayoutWithHeader header={header}>
			<ContentLayout size={ContentLayoutSizes.md}>
				<ContentLayout>
					<JoinAgreement />
				</ContentLayout>
				<ContentLayout>
					<JoinInfo />
				</ContentLayout>
			</ContentLayout>
		</LayoutWithHeader>
	);
}

export default SignUp;
