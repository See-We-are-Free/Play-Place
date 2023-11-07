import { Song } from '@/types/songs';
import React from 'react';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import useFetchPlaylist from '@/hooks/player/useFetchPlaylist';
import { saveSongToPlaylistApi } from '@/utils/api/songs';
import { useRecoilState } from 'recoil';
import { isNowPlayState, nowPlaySongState } from '@/recoil/play';
import CustomToast from '@/components/atoms/CustomToast/CustomToast';
import { ToastStyles } from '@/types/styles.d';
import SearchItems from '../SearchItems/SearchItems';
import SearchListContainer from './style';

interface ISearchListProps {
	searchList: Song[];
	landMarkId?: number;
	closeSearch?: () => void;
}
function SearchList(props: ISearchListProps) {
	const { fetchData } = useFetchPlaylist();
	const { searchList, landMarkId, closeSearch } = props;
	const [, setIsNowPlay] = useRecoilState(isNowPlayState);
	const [, setNowPlaySong] = useRecoilState(nowPlaySongState);

	// 검색 결과 노래 재생시
	const handlePlay = async (song: Song) => {
		const playSong: Song = {
			title: song.title,
			youtubeId: song.youtubeId,
			albumImg: song.albumImg,
			artist: song.artist,
			playTime: -1, // 이 값을 바꾸고싶어.
			songId: -1,
		};

		setNowPlaySong(playSong);
		setIsNowPlay(true);

		try {
			const response = await saveSongToPlaylistApi(playSong);
			if (response.status === 200) {
				setNowPlaySong((state) => {
					if (state) return { basicSongId: response.data.playListSongId, ...state };
					return state;
				});
				fetchData();
				if (landMarkId) {
					CustomToast(ToastStyles.noTabbarSuccess, '1곡이 음악 재생목록에 담겼어요.');
				} else {
					CustomToast(ToastStyles.success, '1곡이 음악 재생목록에 담겼어요.');
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<SearchListContainer>
			{searchList.map((item) => (
				<ContentLayout key={item.youtubeId} $margin="10px 0px">
					<SearchItems
						searchItem={item}
						handleButtonClick={() => handlePlay(item)}
						landmarkId={landMarkId}
						moveLandmark={closeSearch}
					/>
				</ContentLayout>
			))}
		</SearchListContainer>
	);
}

export default SearchList;
