import React from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import { Song } from '@/types/songs';
import MoreHoriz from '@root/public/assets/icons/MoreHoriz.svg';
import Text from '@/components/atoms/Text/Text';
import formatPlayTime from '@/utils/common/formatPlayTime';
import IconButton from '@/components/atoms/IconButton/IconButton';
import GroupSongListItemContainer from './style';

interface IGroupSongListItemProps {
	song: Song;
}
function GroupSongListItem(props: IGroupSongListItemProps) {
	const { song } = props;

	const handleClickMore = () => {};

	return (
		<GroupSongListItemContainer>
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
