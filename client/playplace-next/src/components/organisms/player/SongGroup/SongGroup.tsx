import React from 'react';
import PlayGroup from '@root/public/assets/icons/PlayGroup.svg';
import Down from '@root/public/assets/icons/Down.svg';
import Text from '@/components/atoms/Text/Text';
import IconButton from '@/components/atoms/IconButton/IconButton';
import GroupSongList from '@/components/organisms/GroupSongList/GroupSongList';
import { Song } from '@/types/songs';
import SongGroupContainer from './style';

interface ISongGroupProps {
	groupName: string;
	songs: Song[];
	isBasicGroup?: boolean;
}

function SongGroup(props: ISongGroupProps) {
	const { groupName, songs, isBasicGroup = false } = props;

	return (
		<SongGroupContainer>
			<div id="group-header">
				<div id="group-info">
					<Text text={groupName} fontSize={16} />
					<Text text={`${songs.length} / ${isBasicGroup ? 999 : 99}`} color="gray" />
				</div>
				<div id="group-control">
					<IconButton Icon={<PlayGroup />} color="black300" onClick={() => alert('play group')} size="s" />
					<IconButton Icon={<Down />} color="black300" onClick={() => alert('fold')} size="s" />
				</div>
			</div>
			<div id="group-songs">
				<GroupSongList songs={songs || []} />
			</div>
		</SongGroupContainer>
	);
}

export default SongGroup;
