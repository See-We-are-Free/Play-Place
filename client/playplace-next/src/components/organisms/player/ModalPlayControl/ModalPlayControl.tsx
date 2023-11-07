import React from 'react';
import { useRecoilState } from 'recoil';
import { isNowPlayState, nowPlaySongState, playModalState } from '@/recoil/play';
import SkipPrevious from '@root/public/assets/icons/SkipPrevious.svg';
import Play from '@root/public/assets/icons/Play.svg';
import Pause from '@root/public/assets/icons/Pause.svg';
import SkipNext from '@root/public/assets/icons/SkipNext.svg';
import HeartOff from '@root/public/assets/icons/HeartOff.svg';
import HeartOn from '@root/public/assets/icons/HeartOn.svg';
import IconButton from '@/components/atoms/IconButton/IconButton';
import PlayList from '@root/public/assets/icons/PlayList.svg';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import usePlayer from '@/hooks/player/usePlayer';
import useSongLike from '@/hooks/player/useSongLike';
import ModalPlayControlContainer from './style';

function ModalPlayControl() {
	const [isNowPlay] = useRecoilState(isNowPlayState);
	const [nowPlaySong] = useRecoilState(nowPlaySongState);
	const [playModal, setPlayModal] = useRecoilState(playModalState);
	const { playPreviousSong, playNextSong, playSong, pauseSong } = usePlayer();
	const { isLike, toggleLike } = useSongLike();

	const handlePlayList = () => {
		setPlayModal('playlist');
	};

	const handleNowPlay = () => {
		setPlayModal('nowPlay');
	};

	return (
		<ModalPlayControlContainer>
			<IconButton size="s" Icon={isLike ? <HeartOn /> : <HeartOff />} onClick={toggleLike} color="black300" />
			<IconButton size="l" Icon={<SkipPrevious />} onClick={playPreviousSong} color="white100" />
			{isNowPlay ? (
				<IconButton size="l" Icon={<Pause />} onClick={pauseSong} color="white100" />
			) : (
				<IconButton size="l" Icon={<Play />} onClick={playSong} color="white100" />
			)}
			<IconButton size="l" Icon={<SkipNext />} onClick={playNextSong} color="white100" />
			{playModal === 'nowPlay' ? (
				<IconButton
					size="s"
					Icon={<PlayList />}
					onClick={playModal === 'nowPlay' ? handlePlayList : handleNowPlay}
					color="black300"
				/>
			) : (
				<IconButton
					size="s"
					Icon={<SongThumbnail src={nowPlaySong?.albumImg || ''} $isFullSize />}
					onClick={handleNowPlay}
					color="black300"
				/>
			)}
		</ModalPlayControlContainer>
	);
}

export default ModalPlayControl;
