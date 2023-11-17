import { Song } from '@/types/songs';
import React from 'react';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import usePlayer from '@/hooks/player/usePlayer';
import SearchItems from '../SearchItems/SearchItems';
import SearchListContainer from './style';

interface ISearchListProps {
	searchList: Song[];
	landMarkId?: number;
	closeSearch?: () => void;
}
function SearchList(props: ISearchListProps) {
	const { searchList, landMarkId, closeSearch } = props;
	const { playNewSong } = usePlayer();

	return (
		<SearchListContainer>
			{searchList.map((item) => (
				<ContentLayout key={item.youtubeId} $margin="10px 0px">
					<SearchItems
						searchItem={item}
						handleButtonClick={() => playNewSong(item, landMarkId)}
						landmarkId={landMarkId}
						moveLandmark={closeSearch}
					/>
				</ContentLayout>
			))}
		</SearchListContainer>
	);
}

export default SearchList;
