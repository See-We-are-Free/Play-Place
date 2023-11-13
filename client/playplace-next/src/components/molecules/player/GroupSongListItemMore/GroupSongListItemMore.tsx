import React from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import Text from '@/components/atoms/Text/Text';
import { Song } from '@/types/songs';
import formatPlayTime from '@/utils/common/formatPlayTime';
import HeartOff from '@root/public/assets/icons/HeartOff.svg';
import HeartOn from '@root/public/assets/icons/HeartOn.svg';
import TrashBox from '@root/public/assets/icons/TrashBox.svg';
import Share from '@root/public/assets/icons/Share.svg';

import IconButton from '@/components/atoms/IconButton/IconButton';
import { deleteSongFromPlayListApi } from '@/utils/api/playlists';
import useFetchPlaylist from '@/hooks/player/useFetchPlaylist';
import CustomToast from '@/components/atoms/CustomToast/CustomToast';
import { ToastStyles } from '@/types/styles.d';
import usePlayer from '@/hooks/player/usePlayer';
import useSongLike from '@/hooks/player/useSongLike';
import GroupSongListItemMoreContainer from './style';

interface IGroupSongListItemMoreProps {
	song: Song;
	fromSearch: boolean;
	closeSheet?: () => void;
}

function GroupSongListItemMore(props: IGroupSongListItemMoreProps) {
	const { song, closeSheet = () => {}, fromSearch } = props;
	const { fetchData } = useFetchPlaylist();
	const { playNextSong } = usePlayer();
	const { isLike, toggleLike } = useSongLike();

	const likeSong = () => {
		toggleLike();
		closeSheet();
	};

	const removeSong = async () => {
		let isLandmark = false;
		let songId = -1;

		if ('landmarkSongId' in song) {
			isLandmark = true;
			songId = song.landmarkSongId as number;
		} else if ('basicSongId' in song) {
			songId = song.basicSongId as number;
		}

		try {
			const response = await deleteSongFromPlayListApi(isLandmark, songId);
			console.log('deleteSongFromPlayListApi', response);
			if (response.status === 200) {
				closeSheet();
				playNextSong();
				fetchData();
				CustomToast(ToastStyles.noTabbarSuccess, '1곡이 삭제되었습니다.');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const shareSong = () => {
		CustomToast(ToastStyles.error, '준비 중입니다.');
	};

	return (
		<GroupSongListItemMoreContainer>
			<div id="song-info">
				<SongThumbnail src={song.albumImg} />
				<div>
					<Text text={song.title} fontSize={16} />
					<Text text={`${song.artist} ・ ${formatPlayTime(song.playTime)}`} color="gray" fontSize={14} />
				</div>
			</div>
			<ul id="menu">
				<li role="presentation" onClick={likeSong}>
					<IconButton Icon={isLike ? <HeartOn /> : <HeartOff />} color="white100" size="s" />
					<Text text="좋아요" fontSize={16} />
				</li>
				{fromSearch && (
					<li role="presentation" onClick={removeSong}>
						<IconButton Icon={<TrashBox />} color="white100" size="s" />
						<Text text="재생목록에서 삭제" fontSize={16} />
					</li>
				)}
				<li role="presentation" onClick={shareSong}>
					<IconButton Icon={<Share />} color="white100" size="s" />
					<Text text="공유하기" fontSize={14} />
				</li>
			</ul>
		</GroupSongListItemMoreContainer>
	);
}

export default GroupSongListItemMore;
