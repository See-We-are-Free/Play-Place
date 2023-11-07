import CustomToast from '@/components/atoms/CustomToast/CustomToast';
import { nowPlaySongState } from '@/recoil/play';
import { ToastStyles } from '@/types/styles.d';
import { getSongLike, saveSongLikeToggleApi } from '@/utils/api/songs';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

const useSongLike = () => {
	const [isLike, setIsLike] = useState(false);
	const [nowPlaySong] = useRecoilState(nowPlaySongState);

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

	const toggleLike = async () => {
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

	useEffect(() => {
		fetchLikeData();
	}, [nowPlaySong?.songId]);

	return { isLike, setIsLike, fetchLikeData, toggleLike };
};

export default useSongLike;
