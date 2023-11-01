import React from 'react';
import { Song } from '@/types/songs';
import GroupSongListItem from '@/components/molecules/player/GroupSongListItem/GroupSongListItem';
import GroupSongListContainer from './style';

interface IGroupSongListProps {
	songs: Song[];
}
function GroupSongList(props: IGroupSongListProps) {
	const { songs } = props;
	return (
		<GroupSongListContainer>
			{songs.map((s) => (
				<GroupSongListItem key={s.youtubeId} song={s} />
			))}
		</GroupSongListContainer>
	);
}

export default GroupSongList;
