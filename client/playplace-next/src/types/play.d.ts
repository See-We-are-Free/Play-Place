import Youtube from 'react-youtube';

/**
 * 현재 재생 정보
 * @param isPlaying 현재 재생 중인가
 * @param songPlaying 현재 재생 중인 노래
 */
export interface NowPlayInfoType {
	isPlaying: boolean;
	songPlaying: null | Song;
}

export type PlayModalType = 'none' | 'nowPlay' | 'playlist';

// react-youtube 라이브러리의 YouTube 타입 확장
export interface PlaybackType extends Youtube {
	pauseVideo(): void;
}
