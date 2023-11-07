'use client';

import Header from '@/components/molecules/Header/Header';
import LayoutWithHeader from '@/components/templates/layout/LayoutWithHeader/LayoutWithHeader';
import { HeaderStyles } from '@/types/styles.d';
import MenuIcon from '@root/public/assets/icons/Menu.svg';
import Home from '@/components/pages/Home/Home';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
	const router = useRouter();

	useEffect(() => {
		if (window.AndMap) {
			window.AndMap.successLocate();
		}
	}, []);

	const header = (
		<Header $headerType={HeaderStyles.home} location="장덕동">
			<button type="button" onClick={() => router.push('/login')}>
				<MenuIcon />
			</button>
		</Header>
	);

	return (
		<LayoutWithHeader header={header}>
			<Home />
		</LayoutWithHeader>
	);
}
