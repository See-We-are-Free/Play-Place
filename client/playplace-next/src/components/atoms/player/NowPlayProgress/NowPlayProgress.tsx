import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { playbackState } from '@/recoil/play';
import NowPlayProgressWrapper from './style';

function NowPlayProgress() {
	const [playback] = useRecoilState(playbackState);
	const [playtime, setPlaytime] = useState(playback?.getCurrentTime() || 0);

	useEffect(() => {
		const i = setInterval(() => {
			setPlaytime(playback.getCurrentTime());
		}, 1000);
		return () => clearInterval(i);
	}, [playback]);

	return <NowPlayProgressWrapper>{playtime.toFixed()}</NowPlayProgressWrapper>;
}

export default NowPlayProgress;
