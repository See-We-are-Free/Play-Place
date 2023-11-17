import React from 'react';
import SkipPrevious from '@root/public/assets/icons/SkipPrevious.svg';
import Play from '@root/public/assets/icons/Play.svg';
import Pause from '@root/public/assets/icons/Pause.svg';
import SkipNext from '@root/public/assets/icons/SkipNext.svg';
import PlayList from '@root/public/assets/icons/PlayList.svg';

import IconButton from '@/components/atoms/IconButton/IconButton';
import { useRecoilState } from 'recoil';
import { isNowPlayState, playModalState } from '@/recoil/play';
import usePlayer from '@/hooks/player/usePlayer';
import PlayBarPlayControlContainer from './style';

interface IPlayBarPlayControlProps {
	id?: string;
}
function PlayBarPlayControl(props: IPlayBarPlayControlProps) {
	const { id = '' } = props;
	const [isNowPlay] = useRecoilState(isNowPlayState);
	const [, setPlayModal] = useRecoilState(playModalState);
	const { playPreviousSong, playNextSong, playSong, pauseSong } = usePlayer();

	const handlePlayList = () => {
		setPlayModal('playlist');
	};

	return (
		<PlayBarPlayControlContainer id={id}>
			<IconButton size="s" Icon={<SkipPrevious />} onClick={playPreviousSong} color="white100" />
			{isNowPlay ? (
				<IconButton size="s" Icon={<Pause />} onClick={pauseSong} color="white100" />
			) : (
				<IconButton size="s" Icon={<Play />} onClick={playSong} color="white100" />
			)}
			<IconButton size="s" Icon={<SkipNext />} onClick={playNextSong} color="white100" />
			<IconButton size="s" Icon={<PlayList />} onClick={handlePlayList} color="white100" />
		</PlayBarPlayControlContainer>
	);
}

export default PlayBarPlayControl;
