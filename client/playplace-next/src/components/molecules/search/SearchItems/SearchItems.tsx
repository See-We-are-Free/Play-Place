import React from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import Text from '@/components/atoms/Text/Text';
import { SearchSong } from '@/types/songs';
import Play from '@root/public/assets/icons/Play.svg';
import SearchItemsContainer, { SearchItemsButton, SearchItemsContent, SearchItemsSongInfo } from './style';

interface ISearchItemsProps {
	searchItems: SearchSong;
}

function SearchItems(props: ISearchItemsProps) {
	const { searchItems } = props;

	const artist = searchItems.snippet.channelTitle.split('-');
	return (
		<SearchItemsContainer>
			<SearchItemsContent>
				<SongThumbnail $width={50} $height={50} src={searchItems.snippet.thumbnails.high.url} />
				<SearchItemsSongInfo>
					<Text text={searchItems.snippet.title} color="default" fontSize={16} />
					<Text text={artist[0]} color="gray" fontSize={12} />
				</SearchItemsSongInfo>
			</SearchItemsContent>
			<SearchItemsButton>
				<Play />
			</SearchItemsButton>
		</SearchItemsContainer>
	);
}

export default SearchItems;
