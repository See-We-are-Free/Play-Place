import Header from '@/components/molecules/Header/Header';
import SearchSongs from '@/components/pages/SearchSongs/SearchSongs';
import LayoutWithHeader from '@/components/templates/layout/LayoutWithHeader/LayoutWithHeader';
import { HeaderStyles } from '@/types/styles.d';
import React from 'react';

interface ILandMarkSearchProps {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	landMarkTitle: string;
	landmarkId: number;
}
function LandMarkSearch(props: ILandMarkSearchProps) {
	const { setOpen, landMarkTitle, landmarkId } = props;
	const closeSearch = () => {
		setOpen(false);
	};

	const header = <Header $headerType={HeaderStyles.map} pageName={landMarkTitle} closeSearch={closeSearch} />;

	return (
		<LayoutWithHeader header={header}>
			<SearchSongs landmarkId={landmarkId} closeSearch={closeSearch} />
		</LayoutWithHeader>
	);
}

export default LandMarkSearch;
