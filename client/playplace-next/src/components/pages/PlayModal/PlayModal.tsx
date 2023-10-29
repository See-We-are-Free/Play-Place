'use client';

import { useRecoilState } from 'recoil';
import { playModalState } from '@/recoil/play';
import ModalPlayBar from '@/components/organisms/ModalPlayBar/ModalPlayBar';
import NowPlay from '@/components/organisms/NowPlay/NowPlay';
import PlayList from '@/components/organisms/PlayList/PlayList';
import PlayModalContainer from './style';

function PlayModal() {
	const [playModal, setPlayModal] = useRecoilState(playModalState);

	return (
		<PlayModalContainer $playModal={playModal}>
			<button type="button" onClick={() => setPlayModal('none')}>
				close
			</button>
			{playModal === 'nowPlay' ? <NowPlay /> : <PlayList />}
			<ModalPlayBar />
		</PlayModalContainer>
	);
}

export default PlayModal;
