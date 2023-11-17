import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import { Song } from '@/types/songs';
import React, { useState } from 'react';
import SearchList from '@/components/molecules/search/SearchList/SearchList';
import { ContentLayoutSizes } from '@/types/styles.d';
// import SearchSongs from '@/components/pages/SearchSongs/SearchSongs';
import MapBottomInfo from '@/components/molecules/MapBottomInfo/MapBottomInfo';
import MapBottomSheetHR, { MapBottomResult, MapBottomResultText } from './style';
import LandMarkSearch from '../LandMarkSearch/LandMarkSearch';

interface IMapBottomSheetProps {
	landMarkTitle: string;
	landMarkList: Song[];
	isDistance: boolean;
	landmarkId: number;
}

function MapBottomSheet(props: IMapBottomSheetProps) {
	const { landMarkTitle, landMarkList, isDistance, landmarkId } = props;
	const [open, setOpen] = useState<boolean>(false);

	if (open === true) {
		return <LandMarkSearch setOpen={setOpen} landMarkTitle={landMarkTitle} landmarkId={landmarkId} />;
	}
	return (
		<ContentLayout size={ContentLayoutSizes.md}>
			<ContentLayout $margin="20px 0">
				<MapBottomInfo
					songVolume={landMarkList.length}
					landMarkTitle={landMarkTitle}
					setOpen={setOpen}
					isDistance={isDistance}
					landmarkId={landmarkId}
				/>
			</ContentLayout>
			<MapBottomSheetHR />
			<ContentLayout $margin="20px 0px 40px 0px">
				<MapBottomResult>
					{landMarkList.length ? (
						<SearchList searchList={landMarkList} />
					) : (
						<MapBottomResultText>랜드마크 음악을 추가해보세요!</MapBottomResultText>
					)}
				</MapBottomResult>
			</ContentLayout>
		</ContentLayout>
	);
}

export default MapBottomSheet;
