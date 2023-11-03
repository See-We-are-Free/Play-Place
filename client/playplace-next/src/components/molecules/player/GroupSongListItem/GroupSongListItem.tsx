import React from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import { BasicSong, LandmarkSong, Song } from '@/types/songs';
import MoreHoriz from '@root/public/assets/icons/MoreHoriz.svg';
import Text from '@/components/atoms/Text/Text';
import formatPlayTime from '@/utils/common/formatPlayTime';
import IconButton from '@/components/atoms/IconButton/IconButton';
import { useRecoilState } from 'recoil';
import { isNowPlayState, nowPlaySongState, playbackState } from '@/recoil/play';
import GroupSongListItemContainer from './style';

interface IGroupSongListItemProps {
	song: Song;
}
function GroupSongListItem(props: IGroupSongListItemProps) {
	const { song } = props;
	const [nowPlaySong, setNowPlaySong] = useRecoilState(nowPlaySongState);
	const [, setIsNowPlay] = useRecoilState(isNowPlayState);
	const [playback] = useRecoilState(playbackState);

	const handleClickMore = () => {
		alert('more btn');
	};

	const handleClick = () => {
		if (nowPlaySong) {
			if ('basicSongId' in nowPlaySong && 'basicSongId' in song) {
				if (nowPlaySong.basicSongId !== song.basicSongId) {
					playback.seekTo(0);
				}
			} else if ('landmarkSongId' in nowPlaySong && 'landmarkSongId' in song) {
				if (nowPlaySong.landmarkSongId !== song.landmarkSongId) {
					playback.seekTo(0);
				}
			}
		}
		setNowPlaySong(song);
		setIsNowPlay(true);
	};

	const getNowPlay = (): boolean => {
		if (nowPlaySong) {
			if ('basicSongId' in nowPlaySong && 'basicSongId' in song) {
				return nowPlaySong.basicSongId === song.basicSongId;
			}
			if ('landmarkSongId' in nowPlaySong && 'landmarkSongId' in song) {
				return nowPlaySong.landmarkSongId === song.landmarkSongId;
			}
		}
		return false;
	};

	return (
		<GroupSongListItemContainer onClick={handleClick} $isNowPlay={getNowPlay()}>
			<SongThumbnail src={song.albumImg} />
			<div id="song-info">
				<Text text={song.title} fontSize={14} />
				<Text text={`${song.artist} ・ ${formatPlayTime(song.playTime)}`} color="gray" />
			</div>
			<IconButton id="more" size="s" Icon={<MoreHoriz />} onClick={handleClickMore} color="black300" />
		</GroupSongListItemContainer>
	);
}

export default GroupSongListItem;
