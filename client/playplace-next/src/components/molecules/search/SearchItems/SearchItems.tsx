import React from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import Text from '@/components/atoms/Text/Text';
import { SearchSongItems } from '@/types/songs';
import Play from '@root/public/assets/icons/Play.svg';
import SearchItemsContainer, { SearchItemsButton, SearchItemsContent, SearchItemsSongInfo } from './style';

interface ISearchItemsProps {
	searchItems: SearchSongItems;
}

function SearchItems(props: ISearchItemsProps) {
	const { searchItems } = props;
	return (
		<SearchItemsContainer>
			<SearchItemsContent>
				<SongThumbnail $width={50} $height={50} src={searchItems.thumbnail} />
				<SearchItemsSongInfo>
					<Text text={searchItems.title} color="default" fontSize={16} />
					<Text text={searchItems.artist} color="gray" fontSize={12} />
				</SearchItemsSongInfo>
			</SearchItemsContent>
			<SearchItemsButton>
				<Play />
			</SearchItemsButton>
		</SearchItemsContainer>
	);
}

export default SearchItems;
