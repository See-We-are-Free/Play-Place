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
import usePlayer from '@/hooks/usePlayer';
import ModalPlayBarContainer from './style';

function ModalPlayBar() {
	const [playModal, setPlayModal] = useRecoilState(playModalState);
	const { playPreviousSong, playNextSong, playSong } = usePlayer();

	const handlePlayList = () => {
		setPlayModal('playlist');
	};

	const handleNowPlay = () => {
		setPlayModal('nowPlay');
	};

	return (
		<ModalPlayBarContainer>
			<IconButton
				size="l"
				Icon={<Heart />}
				onClick={() => {
					console.log('하트');
				}}
				color="white100"
			/>
			<IconButton size="l" Icon={<SkipPrevious />} onClick={playPreviousSong} color="white100" />
			<IconButton size="l" Icon={<Play />} onClick={playSong} color="white100" />
			<IconButton size="l" Icon={<SkipNext />} onClick={playNextSong} color="white100" />
			<IconButton
				size="l"
				Icon={playModal === 'nowPlay' ? <PlayList /> : <SongThumbnail src="" />}
				onClick={playModal === 'nowPlay' ? handlePlayList : handleNowPlay}
				color="black300"
			/>
		</ModalPlayBarContainer>
	);
}

export default ModalPlayBar;
