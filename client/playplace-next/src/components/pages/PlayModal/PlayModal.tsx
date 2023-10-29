'use client';

import { useRecoilState } from 'recoil';
import { playModalState } from '@/recoil/play';
import ModalPlayBar from '@/components/organisms/ModalPlayBar/ModalPlayBar';
import PlayModalContainer from './style';

function PlayModal() {
	const [playModal, setPlayModal] = useRecoilState(playModalState);

	return (
		<PlayModalContainer $playModal={playModal}>
			<button type="button" onClick={() => setPlayModal('none')}>
				close
			</button>
			<ModalPlayBar />
		</PlayModalContainer>
	);
}

export default PlayModal;
