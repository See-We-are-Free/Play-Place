import React from 'react';
import Lottie, { Options } from 'react-lottie'; // 타입을 가져옵니다.
import CompleteAnimation from './LoadingLottie.json';

function LoadingLottie() {
	const defaultOptions: Options = {
		loop: true,
		autoplay: true,
		animationData: CompleteAnimation,
	};

	return <Lottie options={defaultOptions} height={40} width={100} />;
}

export default LoadingLottie;
