'use client';

import Header from '@/components/molecules/Header/Header';
import MypageModify from '@/components/organisms/mypage/MypageModify/MypageModify';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import LayoutWithHeader from '@/components/templates/layout/LayoutWithHeader/LayoutWithHeader';
import { ContentLayoutSizes, HeaderStyles } from '@/types/styles.d';

function Info() {
	const header = <Header $headerType={HeaderStyles.back} pageName="회원 정보 수정" />;

	return (
		<LayoutWithHeader header={header}>
			<ContentLayout size={ContentLayoutSizes.md}>
				<MypageModify />
			</ContentLayout>
		</LayoutWithHeader>
	);
}

export default Info;
