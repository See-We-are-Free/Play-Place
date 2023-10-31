'use client';

import HomeSubtitle from '@/components/atoms/HomeSubtitle/HomeSubtitle';
import SearchBar from '@/components/atoms/SearchBar/SearchBar';
import HomeAlbum from '@/components/molecules/HomeAlbum/HomeAlbum';
import LandMark from '@root/public/assets/icons/LandMark.svg';
import Link from 'next/link';

export default function Home() {
	const name = '임하스';

	return (
		<>
			<LandMark />
			<SearchBar />
			<HomeAlbum artist="NewJeans" imgSrc="test" title="HypeBoy" />
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
		</>
	);
}
