import React from 'react';
import SkipPrevious from '@root/public/assets/icons/SkipPrevious.svg';
import Play from '@root/public/assets/icons/Play.svg';
import SkipNext from '@root/public/assets/icons/SkipNext.svg';
import PlayList from '@root/public/assets/icons/PlayList.svg';

import IconButton from '@/components/atoms/IconButton/IconButton';
import { useRecoilState } from 'recoil';
import { playModalState } from '@/recoil/play';
import PlayBarMenuContainer from './style';

function PlayBarMenu() {
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
		<PlayBarMenuContainer>
			<IconButton size="s" Icon={<SkipPrevious />} onClick={handlePrevious} />
			<IconButton size="s" Icon={<Play />} onClick={handlePlay} />
			<IconButton size="s" Icon={<SkipNext />} onClick={handleNext} />
			<IconButton size="s" Icon={<PlayList />} onClick={handlePlayList} />
		</PlayBarMenuContainer>
	);
}

export default PlayBarMenu;
