import React from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import Text from '@/components/atoms/Text/Text';
import { Song } from '@/types/songs';
import Play from '@root/public/assets/icons/Play.svg';
import SearchItemsContainer, { SearchItemsButton, SearchItemsContent, SearchItemsSongInfo } from './style';

interface ISearchItemsProps {
	searchItem: Song;
	handleButtonClick: () => void;
}

function SearchItems(props: ISearchItemsProps) {
	const { searchItem, handleButtonClick } = props;
	const { artist, title, albumImg } = searchItem;

	return (
		<SearchItemsContainer>
			<SearchItemsContent>
				<SongThumbnail $width={50} $height={50} src={albumImg} />
				<SearchItemsSongInfo>
					<Text text={title} color="default" fontSize={16} />
					<Text text={artist} color="gray" fontSize={12} />
				</SearchItemsSongInfo>
			</SearchItemsContent>
			<SearchItemsButton onClick={handleButtonClick}>
				<Play />
			</SearchItemsButton>
		</SearchItemsContainer>
	);
}

export default SearchItems;
