import Header from '@/components/molecules/Header/Header';
import LayoutWithHeader from '@/components/templates/layout/LayoutWithHeader/LayoutWithHeader';
import { HeaderStyles } from '@/types/styles.d';
import Link from 'next/link';

function Search() {
	const header = <Header $headerType={HeaderStyles.search} />;

	return (
		<LayoutWithHeader header={header}>
			<h1>검색</h1>
			<Link href="/">홈으로</Link>
		</LayoutWithHeader>
	);
}

export default Search;
