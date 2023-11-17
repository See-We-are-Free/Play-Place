/**
 * 초를 mm:ss 형태로 변환
 * @param second 초
 * @returns mm:ss
 * */
const formatPlayTime = (second: number) => {
	const minutes = Math.floor(second / 60);
	const remain = (second % 60).toFixed();
	const mm = String(minutes).padStart(2, '0'); // 두 자리 수로 포맷
	const ss = String(remain).padStart(2, '0'); // 두 자리 수로 포맷
	return `${mm}:${ss}`;
};

export default formatPlayTime;
