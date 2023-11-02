import React from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import Text from '@/components/atoms/Text/Text';
import { useRecoilState } from 'recoil';
import { nowPlaySongState, playModalState } from '@/recoil/play';
import PlayBarSongInfoContainer from './style';

interface IPlayBarSongInfoProps {
	id?: string;
}

function PlayBarSongInfo(props: IPlayBarSongInfoProps) {
	const { id = '' } = props;
	const [nowPlaySong] = useRecoilState(nowPlaySongState);
	const [, setPlayModal] = useRecoilState(playModalState);

	const handleClick = () => {
		setPlayModal('nowPlay');
	};

	return (
		<PlayBarSongInfoContainer id={id} onClick={handleClick}>
			<SongThumbnail src={nowPlaySong?.albumImg || ''} alt="" />
			<div id="song">
				{/* TODO : overflow ellipse 해결하기 */}
				<Text text={nowPlaySong?.title || '현재 재생중인 곡이 없습니다'} fontSize={14} />
				<Text text={nowPlaySong?.artist || ''} color="gray" fontSize={12} />
			</div>
		</PlayBarSongInfoContainer>
	);
}

export default PlayBarSongInfo;
