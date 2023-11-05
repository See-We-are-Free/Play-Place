import Header from '@/components/molecules/Header/Header';
import SearchSongs from '@/components/pages/SearchSongs/SearchSongs';
import LayoutWithHeader from '@/components/templates/layout/LayoutWithHeader/LayoutWithHeader';
import { HeaderStyles } from '@/types/styles.d';
import React from 'react';

interface ILandMarkSearchProps {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	landMarkTitle: string;
}
function LandMarkSearch(props: ILandMarkSearchProps) {
	const { setOpen, landMarkTitle } = props;
	const closeSearch = () => {
		setOpen(false);
	};

	const header = <Header $headerType={HeaderStyles.map} pageName={landMarkTitle} closeSearch={closeSearch} />;

	return (
		<LayoutWithHeader header={header}>
			<SearchSongs />
		</LayoutWithHeader>
	);
}

export default LandMarkSearch;
