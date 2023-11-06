import React from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import Text from '@/components/atoms/Text/Text';
import { Song } from '@/types/songs';
import formatPlayTime from '@/utils/common/formatPlayTime';
import Heart from '@root/public/assets/icons/HeartOff.svg';
import TrashBox from '@root/public/assets/icons/TrashBox.svg';
import Share from '@root/public/assets/icons/Share.svg';

import IconButton from '@/components/atoms/IconButton/IconButton';
import { deleteSongFromPlayListApi } from '@/utils/api/playlist';
import useFetchPlaylist from '@/hooks/player/useFetchPlaylist';
import CustomToast from '@/components/atoms/CustomToast/CustomToast';
import { ToastStyles } from '@/types/styles.d';
import usePlayer from '@/hooks/player/usePlayer';
import GroupSongListItemMoreContainer from './style';

interface IGroupSongListItemMoreProps {
	song: Song;
	closeSheet?: () => void;
}

function GroupSongListItemMore(props: IGroupSongListItemMoreProps) {
	const { song, closeSheet = () => {} } = props;
	const { fetchData } = useFetchPlaylist();
	const { playNextSong } = usePlayer();

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
				CustomToast(ToastStyles.success, '1곡이 삭제되었습니다.');
			}
		} catch (error) {
			console.error(error);
		}
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
				<li>
					<IconButton Icon={<Heart />} color="white100" size="s" />
					<Text text="좋아요" fontSize={16} />
				</li>
				<li role="presentation" onClick={removeSong}>
					<IconButton Icon={<TrashBox />} color="white100" size="s" />
					<Text text="재생목록에서 삭제" fontSize={16} />
				</li>
				<li>
					<IconButton Icon={<Share />} color="white100" size="s" />
					<Text text="공유하기" fontSize={14} />
				</li>
			</ul>
		</GroupSongListItemMoreContainer>
	);
}

export default GroupSongListItemMore;
