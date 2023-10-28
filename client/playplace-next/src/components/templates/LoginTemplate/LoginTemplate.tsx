'use client';

import Logo from '@/components/atoms/Logo/Logo';
import Button from '@/components/atoms/Button/Button';
import { ButtonStyles, ContentLayoutSizes } from '@/types/styles.d';
import { joinApi } from '@/utils/api/auth';
import ContentLayout from '../layout/ContentLayout/ContentLayout';
import LoginContainer from './style';

function LoginTemplate() {
	const join = async () => {
		try {
			const response = await joinApi();
			console.log('response', response);
		} catch (error) {
			alert(error);
		}
	};

	return (
		<ContentLayout size={ContentLayoutSizes.lg}>
			<LoginContainer>
				<Logo width="80%" />
				<Button content="Google로 시작하기" buttonType={ButtonStyles.outlinePrimaryLogin} onClick={join} socialImg>
					로그인
				</Button>
			</LoginContainer>
		</ContentLayout>
	);
}

export default LoginTemplate;
