'use client';

import { useRecoilState } from 'recoil';
import { playModalState } from '@/recoil/play';
import ModalPlayBar from '@/components/organisms/player/ModalPlayControl/ModalPlayControl';
import NowPlay from '@/components/organisms/player/NowPlay/NowPlay';
import PlayList from '@/components/organisms/player/PlayList/PlayList';
import PlayModalContainer from './style';

function PlayModal() {
	const [playModal] = useRecoilState(playModalState);

	return (
		<PlayModalContainer $playModal={playModal}>
			{playModal === 'nowPlay' ? <NowPlay /> : <PlayList />}
			<ModalPlayBar />
		</PlayModalContainer>
	);
}

export default PlayModal;
