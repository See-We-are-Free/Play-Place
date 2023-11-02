'use client';

import Header from '@/components/molecules/Header/Header';
import LayoutWithHeader from '@/components/templates/layout/LayoutWithHeader/LayoutWithHeader';
import { HeaderStyles } from '@/types/styles.d';
import MenuIcon from '@root/public/assets/icons/Menu.svg';
import Home from '@/components/pages/Home/Home';

export default function HomePage() {
	const header = (
		<Header $headerType={HeaderStyles.home} location="장덕동">
			<button type="button" onClick={() => console.log('클릭')}>
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
