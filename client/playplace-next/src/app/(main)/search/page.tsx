import Header from '@/components/molecules/Header/Header';
import SearchSongs from '@/components/pages/SearchSongs/SearchSongs';
import LayoutWithHeader from '@/components/templates/layout/LayoutWithHeader/LayoutWithHeader';
import { HeaderStyles } from '@/types/styles.d';

function Search() {
	const header = <Header $headerType={HeaderStyles.search} />;

	return (
		<LayoutWithHeader header={header}>
			<SearchSongs />
		</LayoutWithHeader>
	);
}

export default Search;
