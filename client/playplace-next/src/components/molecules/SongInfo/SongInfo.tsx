import React from 'react';
import SongThumbnail from '@/components/atoms/SongThumbnail/SongThumbnail';
import Text from '@/components/atoms/Text/Text';
import { useRecoilState } from 'recoil';
import { playModalState } from '@/recoil/play';
import SongInfoContainer from './style';

function SongInfo() {
	const [, setPlayModal] = useRecoilState(playModalState);

	const handleClick = () => {
		setPlayModal('nowPlay');
	};

	return (
		<SongInfoContainer onClick={handleClick}>
			<SongThumbnail src="" alt="" />
			<div id="song">
				{/* TODO : overflow ellipse 해결하기 */}
				<Text text="이젠나만 믿어요" fontSize={12} />
				<Text text="그린 토마토 후라이드그린토 후라이드" color="gray" fontSize={10} />
			</div>
		</SongInfoContainer>
	);
}

export default SongInfo;
