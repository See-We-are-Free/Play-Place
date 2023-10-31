import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { playbackState } from '@/recoil/play';
import formatPlayTime from '@/utils/common/formatPlayTime';
import NowPlayProgressContainer from './style';

/**
 * 나우플레이 재생 바
 */
function NowPlayProgress() {
	const [progress, setProgress] = useState(0);
	const [playback] = useRecoilState(playbackState);
	const [playtime, setPlaytime] = useState(playback?.getCurrentTime().toFixed() || 0);
	const [isMouseUp, setIsMouseUp] = useState(true);

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProgress(+e.target.value);
	};

	const handleMouseUp = () => {
		setIsMouseUp(true);
		playback?.seekTo(progress);
	};

	const handleMouseDown = () => {
		setIsMouseUp(false);
	};

	// 현재 재생시간을 1초마다 업데이트
	useEffect(() => {
		setPlaytime(playback?.getCurrentTime() || 0);
		const i = setInterval(() => {
			if (isMouseUp) setPlaytime(playback.getCurrentTime().toFixed());
		}, 1000);
		return () => clearInterval(i);
	}, [playback]);

	// 업데이트 된 재생 시간을 Progress에 반영
	useEffect(() => {
		if (isMouseUp) setProgress(playtime);
	}, [playtime]);

	return (
		<NowPlayProgressContainer>
			<input
				type="range"
				value={progress}
				onInput={handleInput}
				max={playback?.getDuration() || 0}
				onTouchStart={handleMouseDown}
				onTouchEnd={handleMouseUp}
				onMouseDown={handleMouseDown} // TODO :: 모바일 배포 이후에 제거
				onMouseUp={handleMouseUp} // TODO :: 모바일 배포 이후에 제거
			/>
			<div id="time">
				<span id="playtime">{formatPlayTime(progress)}</span>
				<span id="duration">{formatPlayTime(playback?.getDuration().toFixed() || 0)}</span>
			</div>
		</NowPlayProgressContainer>
	);
}

export default NowPlayProgress;
