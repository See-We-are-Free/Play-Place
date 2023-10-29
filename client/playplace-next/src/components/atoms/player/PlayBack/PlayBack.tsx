'use client';

import { useRef } from 'react';
import Youtube from 'react-youtube';

// react-youtube 라이브러리의 YouTube 타입 확장
interface ExtendedYouTube extends Youtube {
	pauseVideo(): void;
}

function PlayBack() {
	const playerRef = useRef<ExtendedYouTube | null>(null); // YouTube 플레이어 참조
	console.log(playerRef.current?.internalPlayer);

	const handleStart = () => {
		playerRef.current?.internalPlayer.playVideo();
	};

	const handlePause = () => {
		playerRef.current?.internalPlayer.pauseVideo();
	};

	const handleCurrent = async () => {
		console.log(await playerRef.current?.internalPlayer.getPlayerState());
	};

	const opts = {
		width: '0',
		height: '0',
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
		},
	};

	return (
		<div>
			<button type="button" onClick={handleStart}>
				start
			</button>
			<button type="button" onClick={handlePause}>
				pause
			</button>
			<button type="button" onClick={handleCurrent}>
				handleCurrent
			</button>
			<Youtube key="OMjDI2NqQ9M" videoId="OMjDI2NqQ9M" opts={opts} ref={playerRef} />
		</div>
	);
}

export default PlayBack;
