import Link from 'next/link';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import { ContentLayoutSizes } from '@/types/styles.d';

function SignUp() {
	return (
		<>
			<h1>회원가입</h1>
			<Link href="/">홈으로</Link>

			<ContentLayout>컨텐츠 레이아웃 기본 padding 0, margin 30px</ContentLayout>

			<ContentLayout $padding="10px" $margin="10px" $background="--black-500">
				컨텐츠 레이아웃 변수 padding 10px
				<ContentLayout $padding="0 20px" $background="--black-400">
					컨텐츠 레이아웃 배경색 --black-500
				</ContentLayout>
				<ContentLayout $background="--black-400">
					padding: sm 30, md 20, lg 10, full 0
					<ContentLayout size={ContentLayoutSizes.md}>컨텐츠 레이아웃 지정된 사이즈 사용(md)</ContentLayout>
					<ContentLayout size={ContentLayoutSizes.sm}>컨텐츠 레이아웃 지정된 사이즈 사용(sm)</ContentLayout>
				</ContentLayout>
			</ContentLayout>

			<ContentLayout size={ContentLayoutSizes.lg}>
				컨텐츠 레이아웃 보더
				<ContentLayout
					size={ContentLayoutSizes.lg}
					$padding="10px"
					$margin="10px"
					$background="--black-500"
					$border="1px solid var(--white-500)"
					$borderRadius={5}
				>
					보더 스타일, 라디우스 5px
				</ContentLayout>
			</ContentLayout>
		</>
	);
}

export default SignUp;
