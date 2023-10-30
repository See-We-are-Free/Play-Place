import React from 'react';
import SkipPrevious from '@root/public/assets/icons/SkipPrevious.svg';
import Play from '@root/public/assets/icons/Play.svg';
import SkipNext from '@root/public/assets/icons/SkipNext.svg';
import PlayList from '@root/public/assets/icons/PlayList.svg';

import IconButton from '@/components/atoms/IconButton/IconButton';
import { useRecoilState } from 'recoil';
import { playModalState } from '@/recoil/play';
import PlayBarPlayControlContainer from './style';

function PlayBarPlayControl() {
	const [, setPlayModal] = useRecoilState(playModalState);
	const handlePrevious = () => {
		alert('이전 곡');
	};

	const handlePlay = () => {
		alert('재생');
	};

	const handleNext = () => {
		alert('다음 곡');
	};

	const handlePlayList = () => {
		setPlayModal('playlist');
	};
	return (
		<PlayBarPlayControlContainer>
			<IconButton size="s" Icon={<SkipPrevious />} onClick={handlePrevious} color="white100" />
			<IconButton size="s" Icon={<Play />} onClick={handlePlay} color="white100" />
			<IconButton size="s" Icon={<SkipNext />} onClick={handleNext} color="white100" />
			<IconButton size="s" Icon={<PlayList />} onClick={handlePlayList} color="white100" />
		</PlayBarPlayControlContainer>
	);
}

export default PlayBarPlayControl;
