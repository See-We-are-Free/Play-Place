import React from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import Text from '@/components/atoms/Text/Text';
import { SearchSong, Song } from '@/types/songs';
import Play from '@root/public/assets/icons/Play.svg';
import { useRecoilState } from 'recoil';
import { nowPlaySongState, playbackState } from '@/recoil/play';
import SearchItemsContainer, { SearchItemsButton, SearchItemsContent, SearchItemsSongInfo } from './style';

interface ISearchItemsProps {
	searchItem: SearchSong;
}

function SearchItems(props: ISearchItemsProps) {
	const { searchItem } = props;
	const artist = searchItem.snippet.channelTitle.replace(' - Topic', '');
	const [, setNowPlaySong] = useRecoilState(nowPlaySongState);
	const [playback] = useRecoilState(playbackState);

	// playback이 업데이트될 때 실행
	const handlePlay = async () => {
		const song: Song = {
			title: searchItem.snippet.title,
			youtubeId: searchItem.id.videoId,
			albumImg: searchItem.snippet.thumbnails.default.url,
			artist,
			playTime: -1, // 초기값 설정
			songId: -1,
		};

		setNowPlaySong(song);
		console.log(playback.getDuration());
	};

	return (
		<SearchItemsContainer>
			<SearchItemsContent>
				<SongThumbnail $width={50} $height={50} src={searchItem.snippet.thumbnails.high.url} />
				<SearchItemsSongInfo>
					<Text text={searchItem.snippet.title} color="default" fontSize={16} />
					<Text text={artist} color="gray" fontSize={12} />
				</SearchItemsSongInfo>
			</SearchItemsContent>
			<SearchItemsButton onClick={handlePlay}>
				<Play />
			</SearchItemsButton>
		</SearchItemsContainer>
	);
}

export default SearchItems;
