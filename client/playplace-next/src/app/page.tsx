'use client';

import styled from 'styled-components';

const Test = styled.div`
	background-color: red;
`;

export default function Home() {
	return (
		<main>
			<h1>PlayPlace Home</h1>
			<h2>함께 만드는 위치 기반 공유 플레이리스트</h2>
			<h3>C109</h3>
			<Test>테스트입니다</Test>
		</main>
	);
}
