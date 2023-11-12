'use client';

import Header from '@/components/molecules/Header/Header';
import LayoutWithHeader from '@/components/templates/layout/LayoutWithHeader/LayoutWithHeader';
import { HeaderStyles } from '@/types/styles.d';
import MenuIcon from '@root/public/assets/icons/Menu.svg';
import Home from '@/components/pages/Home/Home';
import { useEffect, useState } from 'react';
import MypageView from '@/components/organisms/MypageView/MypageView';
import { Village } from '@/types/songs';

export default function HomePage() {
	const [isMyMenuOpen, setIsMyMenuOpen] = useState<boolean>(false);
	const [village, setVillage] = useState<Village>({
		villageName: '',
		villageCode: 0,
	});

	const handleMyPageOn = () => {
		console.log('열려');
		setIsMyMenuOpen(true);
	};

	useEffect(() => {
		if (typeof window !== 'undefined' && window.AndMap) {
			window.AndMap.successLocate();
		}
	}, []);

	const header = (
		<>
			<Header $headerType={HeaderStyles.home} location={village.villageName}>
				<button type="button" onClick={handleMyPageOn}>
					<MenuIcon />
				</button>
			</Header>
		</>
	);

	return (
		<>
			<LayoutWithHeader header={header}>
				<Home setVillage={setVillage} />
			</LayoutWithHeader>
			<MypageView $isMyMenuOpen={isMyMenuOpen} setIsMyMenuOpen={setIsMyMenuOpen} />
		</>
	);
}
