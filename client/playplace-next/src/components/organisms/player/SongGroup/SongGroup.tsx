import React from 'react';
import { SONGS } from '@/constants/dummy';
import PlayGroup from '@root/public/assets/icons/PlayGroup.svg';
import Down from '@root/public/assets/icons/Down.svg';
import Text from '@/components/atoms/Text/Text';
import IconButton from '@/components/atoms/IconButton/IconButton';
import SongGroupContainer from './style';
import GroupSongList from '../../GroupSongList/GroupSongList';

interface ISongGroupProps {
	groupName: string;
}
function SongGroup(props: ISongGroupProps) {
	const { groupName } = props;

	return (
		<SongGroupContainer>
			<div id="group-header">
				<div id="group-info">
					<Text text={groupName} fontSize={16} />
					<Text text="10 / 999" color="gray" />
				</div>
				<div id="group-control">
					<IconButton Icon={<PlayGroup />} color="black300" onClick={() => alert('play group')} size="s" />
					<IconButton Icon={<Down />} color="black300" onClick={() => alert('fold')} size="s" />
				</div>
			</div>
			<div id="group-songs">
				<GroupSongList songs={SONGS} />
			</div>
		</SongGroupContainer>
	);
}

export default SongGroup;
