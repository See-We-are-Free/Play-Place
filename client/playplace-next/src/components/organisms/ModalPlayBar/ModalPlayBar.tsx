import React from 'react';
import { useRecoilState } from 'recoil';
import { playModalState } from '@/recoil/play';
import SkipPrevious from '@root/public/assets/icons/SkipPrevious.svg';
import Play from '@root/public/assets/icons/Play.svg';
import SkipNext from '@root/public/assets/icons/SkipNext.svg';
import Heart from '@root/public/assets/icons/Heart.svg';
import IconButton from '@/components/atoms/IconButton/IconButton';
import PlayList from '@root/public/assets/icons/PlayList.svg';

import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';

import ModalPlayBarContainer from './style';

function ModalPlayBar() {
	const [playModal, setPlayModal] = useRecoilState(playModalState);

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

	const handleNowPlay = () => {
		setPlayModal('nowPlay');
	};

	return (
		<ModalPlayBarContainer>
			<IconButton size="l" Icon={<Heart />} onClick={handlePrevious} />
			<IconButton size="l" Icon={<SkipPrevious />} onClick={handlePrevious} />
			<IconButton size="l" Icon={<Play />} onClick={handlePlay} />
			<IconButton size="l" Icon={<SkipNext />} onClick={handleNext} />
			<IconButton
				size="l"
				Icon={playModal === 'nowPlay' ? <PlayList /> : <SongThumbnail src="" />}
				onClick={playModal === 'nowPlay' ? handlePlayList : handleNowPlay}
			/>
		</ModalPlayBarContainer>
	);
}

export default ModalPlayBar;
