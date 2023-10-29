import Link from 'next/link';

export default function Home() {
	return (
		<>
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
