import React, { useEffect, useState } from 'react';
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
import { getSongLike, saveSongLikeToggleApi } from '@/utils/api/songs';
import CustomToast from '@/components/atoms/CustomToast/CustomToast';
import { ToastStyles } from '@/types/styles.d';
import ModalPlayControlContainer from './style';

function ModalPlayControl() {
	const [isNowPlay] = useRecoilState(isNowPlayState);
	const [nowPlaySong] = useRecoilState(nowPlaySongState);
	const [playModal, setPlayModal] = useRecoilState(playModalState);
	const [isLike, setIsLike] = useState(false);
	const { playPreviousSong, playNextSong, playSong, pauseSong } = usePlayer();

	const handlePlayList = () => {
		setPlayModal('playlist');
	};

	const handleNowPlay = () => {
		setPlayModal('nowPlay');
	};

	const handleLike = async () => {
		try {
			if (!nowPlaySong) return;

			const response = await saveSongLikeToggleApi({ songId: nowPlaySong.songId, like: !isLike });
			console.log('saveSongLikeToggleApi :: ', response);

			if (response.status === 200) {
				setIsLike(!isLike);
				if (isLike) {
					CustomToast(ToastStyles.success, '이 음악의 좋아요를 취소합니다.');
				} else {
					CustomToast(ToastStyles.success, '이 음악을 좋아합니다.');
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	const fetchLikeData = async () => {
		try {
			if (!nowPlaySong) return;
			const response = await getSongLike(nowPlaySong?.songId);
			if (response.status === 200) {
				setIsLike(response.data.like);
			}
			console.log('fetchLikeData :: ', response);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchLikeData();
	}, [nowPlaySong?.songId]);

	return (
		<ModalPlayControlContainer>
			<IconButton size="s" Icon={isLike ? <HeartOn /> : <HeartOff />} onClick={handleLike} color="black300" />
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
