import JoinAgreement from '@/components/organisms/JoinAgreement/JoinAgreement';
import JoinInfo from '@/components/organisms/JoinInfo/JoinInfo';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import { ContentLayoutSizes } from '@/types/styles.d';

function SignUp() {
	return (
		<ContentLayout size={ContentLayoutSizes.md}>
			<ContentLayout>
				step 1 : 개인정보수집 및 활용 동의
				<JoinAgreement />
			</ContentLayout>
			<ContentLayout>
				step 2 : 이모지, 닉네임 입력
				<JoinInfo />
			</ContentLayout>
		</ContentLayout>
	);
}

export default SignUp;
