'use client';

import Header from '@/components/molecules/Header/Header';
import MypageSetting from '@/components/organisms/mypage/MypageSetting/MypageSetting';
import LayoutWithHeader from '@/components/templates/layout/LayoutWithHeader/LayoutWithHeader';
import { HeaderStyles } from '@/types/styles.d';

function Setting() {
	const header = <Header $headerType={HeaderStyles.back} pageName="설정" />;

	return (
		<LayoutWithHeader header={header}>
			<MypageSetting />
		</LayoutWithHeader>
	);
}

export default Setting;
