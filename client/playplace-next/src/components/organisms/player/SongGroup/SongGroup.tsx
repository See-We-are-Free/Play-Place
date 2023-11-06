import React from 'react';
import PlayGroup from '@root/public/assets/icons/PlayGroup.svg';
import Down from '@root/public/assets/icons/Down.svg';
import Text from '@/components/atoms/Text/Text';
import IconButton from '@/components/atoms/IconButton/IconButton';
import GroupSongList from '@/components/organisms/GroupSongList/GroupSongList';
import { BasicSong, LandmarkSong } from '@/types/songs';
import useToggle from '@/hooks/useToggle';
import SongGroupContainer from './style';

interface ISongGroupProps {
	groupName: string;
	songs: BasicSong[] | LandmarkSong[];
	isBasicGroup?: boolean;
}

function SongGroup(props: ISongGroupProps) {
	const { groupName, songs, isBasicGroup = false } = props;
	const [toggle, setToggle] = useToggle(false);

	return (
		<SongGroupContainer $isFold={toggle}>
			<div id="group-header">
				<div id="group-info">
					<Text text={groupName} fontSize={16} />
					<Text text={`${songs.length} / ${isBasicGroup ? 999 : 99}`} color="gray" />
				</div>
				<div id="group-control">
					<IconButton Icon={<PlayGroup />} color="black300" onClick={() => alert('play group')} size="s" />
					<IconButton id="fold-btn" Icon={<Down />} color="black300" onClick={setToggle} size="s" />
				</div>
			</div>
			<div id="group-songs">
				<GroupSongList songs={songs || []} isBasicGroup />
			</div>
		</SongGroupContainer>
	);
}

export default SongGroup;
