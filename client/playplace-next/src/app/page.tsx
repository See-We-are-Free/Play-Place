'use client';

import HomeSubtitle from '@/components/atoms/HomeSubtitle/HomeSubtitle';
import Header from '@/components/molecules/Header/Header';
import HomeAlbum from '@/components/molecules/HomeAlbum/HomeAlbum';
import LandMark from '@root/public/assets/icons/LandMark.svg';
import LayoutWithHeader from '@/components/templates/layout/LayoutWithHeader/LayoutWithHeader';
import { HeaderStyles } from '@/types/styles.d';
// import HypeBoy from '@root/public/assets/images/hypeBoy.jpg';
import MenuIcon from '@root/public/assets/icons/Menu.svg';
import Link from 'next/link';
import { SONG_DATA } from '@/types/home.d';
import { useState } from 'react';
import ContentLayout from '../components/templates/layout/ContentLayout/ContentLayout';

export default function Home() {
	const name = '임하스';
	const [songData] = useState(SONG_DATA);
	const header = (
		<Header $headerType={HeaderStyles.home} location="장덕동">
			<button type="button" onClick={() => console.log('클릭')}>
				<MenuIcon />
			</button>
		</Header>
	);

	return (
		<LayoutWithHeader header={header}>
			<ContentLayout $margin="0 0 140px">
				<LandMark />
				<HomeAlbum locationSongList={songData} />
				<HomeSubtitle colorSubtitle="이번주" normalSubtitle="가장 많이 재생된 음악" />
				<HomeSubtitle colorSubtitle={`${name}님 근처`} normalSubtitle="사람들의 음악" />
				<h1>PlayPlace Home</h1>
				<h2>함께 만드는 위치 기반 공유 플레이리스트</h2>
				<h3>C109</h3>
				<nav>
					<ul>
						<li>
							<Link href="/login">로그인</Link>
						</li>
						<li>
							<Link href="/signup">회원가입</Link>
						</li>
					</ul>
				</nav>
			</ContentLayout>
		</LayoutWithHeader>
	);
}
