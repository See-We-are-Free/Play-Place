import React from 'react';
import SkipPrevious from '@root/public/assets/icons/SkipPrevious.svg';
import Play from '@root/public/assets/icons/Play.svg';
import SkipNext from '@root/public/assets/icons/SkipNext.svg';
import PlayList from '@root/public/assets/icons/PlayList.svg';

import IconButton from '@/components/atoms/IconButton/IconButton';
import { useRecoilState } from 'recoil';
import { playModalState } from '@/recoil/play';
import usePlayer from '@/hooks/usePlayer';
import PlayBarPlayControlContainer from './style';

function PlayBarPlayControl() {
	const [, setPlayModal] = useRecoilState(playModalState);
	const { playPreviousSong, playNextSong, playSong } = usePlayer();

	const handlePlayList = () => {
		setPlayModal('playlist');
	};
	return (
		<PlayBarPlayControlContainer>
			<IconButton size="s" Icon={<SkipPrevious />} onClick={playPreviousSong} color="white100" />
			<IconButton size="s" Icon={<Play />} onClick={playSong} color="white100" />
			<IconButton size="s" Icon={<SkipNext />} onClick={playNextSong} color="white100" />
			<IconButton size="s" Icon={<PlayList />} onClick={handlePlayList} color="white100" />
		</PlayBarPlayControlContainer>
	);
}

export default PlayBarPlayControl;
