'use client';

import Button from '@/components/atoms/Button/Button';
import HomeSubtitle from '@/components/atoms/HomeSubtitle/HomeSubtitle';
import HomeAlbum from '@/components/molecules/HomeAlbum/HomeAlbum';
import LayoutWithHeaderAndTabbar from '@/components/templates/layout/LayoutWithHeaderAndTabbar/LayoutWithHeaderAndTabbar';
import { SONG_DATA } from '@/types/home.d';
import { ButtonStyles } from '@/types/styles.d';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
	const test = () => {
		console.log(1);
	};

	const name = '임하스';
	const [songData] = useState(SONG_DATA);

	return (
		<LayoutWithHeaderAndTabbar header={<header>헤더</header>}>
			<HomeAlbum locationSongList={songData} />
			<HomeSubtitle colorSubtitle="이번주" normalSubtitle="가장 많이 재생된 음악" />
			<HomeSubtitle colorSubtitle={`${name}님 근처`} normalSubtitle="사람들의 음악" />
			<Button buttonType={ButtonStyles.primary} content="눌러주세요" onClick={test} socialImg={false} />
			<Button buttonType={ButtonStyles.outlinePrimary} content="눌러주세요" onClick={test} socialImg={false} />
			<Button buttonType={ButtonStyles.success} content="눌러주세요" onClick={test} socialImg={false} />
			<Button buttonType={ButtonStyles.cancel} content="눌러주세요" onClick={test} socialImg={false} />
			<Button buttonType={ButtonStyles.cancel} content="눌러주세요" onClick={test} socialImg />
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
					<li>
						<Link href="/map">플레이맵</Link>
					</li>
					<li>
						<Link href="/radar">플레이더</Link>
					</li>
					<li>
						<Link href="/search">검색</Link>
					</li>
				</ul>
			</nav>
		</LayoutWithHeaderAndTabbar>
	);
}
