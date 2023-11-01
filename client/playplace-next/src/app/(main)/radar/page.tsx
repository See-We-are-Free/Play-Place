'use client';

import ToggleButton from '@/components/atoms/ToggleButton/ToggleButton';
import { Text } from '@/components/atoms/headerItem/HeaderRightItem/style';
import Header from '@/components/molecules/Header/Header';
import LayoutWithHeader from '@/components/templates/layout/LayoutWithHeader/LayoutWithHeader';
import { HeaderStyles } from '@/types/styles.d';
import Link from 'next/link';

function Radar() {
	const header = (
		<Header $headerType={HeaderStyles.radar}>
			<Text>공유하기</Text>
			<ToggleButton init={false} />
		</Header>
	);

	return (
		<LayoutWithHeader header={header}>
			<h1>플레이더</h1>
			<Link href="/">홈으로</Link>
		</LayoutWithHeader>
	);
}

export default Radar;
