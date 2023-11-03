import Youtube from 'react-youtube';
import { LandmarkSong } from './songs';

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

export interface IsNowPlayType {
	isPlay: boolean;
	playtime: number;
	duration: number;
}

export interface LandmarkGroup {
	landmarkId: number;
	userLandmarkGroupId: number;
	title: string;
	landmarkSongsCnt: number;
	landmarkSongs: LandmarkSong[];
}
