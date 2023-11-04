import React from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import Text from '@/components/atoms/Text/Text';
import { Song } from '@/types/songs';
import Play from '@root/public/assets/icons/Play.svg';
import { useRecoilState } from 'recoil';
import { isNowPlayState, nowPlaySongState } from '@/recoil/play';
import { saveSongToPlaylistApi } from '@/utils/api/songs';
import useFetchPlaylist from '@/hooks/player/useFetchPlaylist';
import SearchItemsContainer, { SearchItemsButton, SearchItemsContent, SearchItemsSongInfo } from './style';

interface ISearchItemsProps {
	searchItem: Song;
}

function SearchItems(props: ISearchItemsProps) {
	const { fetchData } = useFetchPlaylist();
	const { searchItem } = props;
	const { artist, title, albumImg, youtubeId } = searchItem;
	const [, setIsNowPlay] = useRecoilState(isNowPlayState);
	const [, setNowPlaySong] = useRecoilState(nowPlaySongState);

	// 검색 결과 노래 재생시
	const handlePlay = async () => {
		const song: Song = {
			title,
			youtubeId,
			albumImg,
			artist,
			playTime: -1, // 이 값을 바꾸고싶어.
			songId: -1,
		};

		setNowPlaySong(song);
		setIsNowPlay(true);

		try {
			const response = await saveSongToPlaylistApi(song);
			if (response.status === 200) {
				setNowPlaySong((state) => {
					if (state) return { playlistSongId: response.data.playListSongId, ...state };
					return state;
				});
				fetchData();
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<SearchItemsContainer>
			<SearchItemsContent>
				<SongThumbnail $width={50} $height={50} src={albumImg} />
				<SearchItemsSongInfo>
					<Text text={title} color="default" fontSize={16} />
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