'use client';

import Header from '@/components/molecules/Header/Header';
import MypageLike from '@/components/organisms/mypage/MypageLike/MypageLike';
import LayoutWithHeader from '@/components/templates/layout/LayoutWithHeader/LayoutWithHeader';
import { HeaderStyles } from '@/types/styles.d';

function Like() {
	const header = <Header $headerType={HeaderStyles.back} pageName="좋아요" />;

	return (
		<LayoutWithHeader header={header}>
			<MypageLike />
		</LayoutWithHeader>
	);
}

export default Like;
