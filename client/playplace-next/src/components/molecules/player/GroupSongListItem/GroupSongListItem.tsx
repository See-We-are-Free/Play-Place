import React from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import { Song } from '@/types/songs';
import Text from '@/components/atoms/Text/Text';
import formatPlayTime from '@/utils/common/formatPlayTime';
import GroupSongListItemContainer from './style';

interface IGroupSongListItemProps {
	song: Song;
}
function GroupSongListItem(props: IGroupSongListItemProps) {
	const { song } = props;
	return (
		<GroupSongListItemContainer>
			<SongThumbnail src={song.albumImg} />
			<div id="song-info">
				<Text text={song.title} fontSize={14} />
				<Text text={`${song.artist} ・ ${formatPlayTime(song.playTime)}`} color="gray" />
			</div>
		</GroupSongListItemContainer>
	);
}

export default GroupSongListItem;
