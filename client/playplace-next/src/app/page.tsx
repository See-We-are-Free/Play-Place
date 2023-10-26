'use client';

import CommonButton from '@/components/atoms/Button/Button';
import LayoutWithHeaderAndTabbar from '@/components/templates/layout/LayoutWithHeaderAndTabbar/LayoutWithHeaderAndTabbar';
import Link from 'next/link';

export default function Home() {
	const test = () => {
		console.log(1);
	};

	return (
		<LayoutWithHeaderAndTabbar header={<header>헤더</header>}>
			<CommonButton buttontype="primary" content="눌러주세요" onClick={test} />
			<CommonButton buttontype="outlinePrimary" content="눌러주세요" onClick={test} />
			<CommonButton buttontype="success" content="눌러주세요" onClick={test} />
			<CommonButton buttontype="cancel" content="눌러주세요" onClick={test} />
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
