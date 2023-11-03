import React from 'react';
import { BasicSong, LandmarkSong } from '@/types/songs';
import GroupSongListItem from '@/components/molecules/player/GroupSongListItem/GroupSongListItem';
import GroupSongListContainer from './style';

interface IGroupSongListProps {
	songs: BasicSong[] | LandmarkSong[];
	isBasicGroup?: boolean;
}
function GroupSongList(props: IGroupSongListProps) {
	const { songs, isBasicGroup = false } = props;
	return (
		<GroupSongListContainer>
			{songs.map((s) => (
				<GroupSongListItem
					key={isBasicGroup ? `${(s as BasicSong).basicSongId}b` : `${(s as LandmarkSong).landmarkSongId}l`}
					song={s}
				/>
			))}
		</GroupSongListContainer>
	);
}

export default GroupSongList;
