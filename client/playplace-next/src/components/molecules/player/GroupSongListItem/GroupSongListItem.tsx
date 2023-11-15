import React, { MouseEvent } from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import { Song } from '@/types/songs';
import MoreHoriz from '@root/public/assets/icons/MoreHoriz.svg';
import Text from '@/components/atoms/Text/Text';
import formatPlayTime from '@/utils/common/formatPlayTime';
import IconButton from '@/components/atoms/IconButton/IconButton';
import { useRecoilState } from 'recoil';
import { isNowPlayState, nowPlaySongState, playbackState } from '@/recoil/play';
import useToggle from '@/hooks/useToggle';
import GroupSongListItemContainer from './style';
import CustomBottomSheet from '../../CustomBottomSheet/CustomBottomSheet';
import GroupSongListItemMore from '../GroupSongListItemMore/GroupSongListItemMore';

interface IGroupSongListItemProps {
	song: Song;
	isSearch: boolean;
}
function GroupSongListItem(props: IGroupSongListItemProps) {
	const { song, isSearch } = props;
	const [nowPlaySong, setNowPlaySong] = useRecoilState(nowPlaySongState);
	const [, setIsNowPlay] = useRecoilState(isNowPlayState);
	const [playback] = useRecoilState(playbackState);
	const [isOpenSheet, toggleIsOpenSheet] = useToggle();

	const handleClickMore = (event: MouseEvent<HTMLButtonElement>) => {
		toggleIsOpenSheet();
		event.preventDefault();
		event.stopPropagation();
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
			<div id="song-info">
				<SongThumbnail src={song.albumImg} />
				<div id="song-info-text">
					<Text text={song.title} fontSize={14} $overflowHidden />
					<Text
						text={`${song.artist}${song.playTime !== -1 ? ` ・ ${formatPlayTime(song.playTime)}` : ''}`}
						color="gray"
					/>
				</div>
			</div>
			<div>
				<IconButton id="more" size="s" Icon={<MoreHoriz />} onClick={handleClickMore} color="black300" />

				{/* More BottomSheet */}
				<CustomBottomSheet open={isOpenSheet} setOpen={toggleIsOpenSheet}>
					<GroupSongListItemMore song={song} closeSheet={toggleIsOpenSheet} fromSearch={isSearch} />
				</CustomBottomSheet>
			</div>
		</GroupSongListItemContainer>
	);
}

export default GroupSongListItem;
