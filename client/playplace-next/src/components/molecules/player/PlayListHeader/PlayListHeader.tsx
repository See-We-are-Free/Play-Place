import React from 'react';
import Text from '@/components/atoms/Text/Text';
import FoldGroup from '@root/public/assets/icons/FoldGroup.svg';
import Down from '@root/public/assets/icons/Down.svg';
import IconButton from '@/components/atoms/IconButton/IconButton';
import { useRecoilState } from 'recoil';
import { playModalState } from '@/recoil/play';
import SmallIconButton from '@/components/atoms/player/SmallIconButton/SmallIconButton';
import PlayListHeaderContainer from './style';

function PlayListHeader() {
	const [, setPlayModal] = useRecoilState(playModalState);

	const closeModal = () => {
		setPlayModal('none');
	};

	const foldAll = () => {
		const foldAllEvent = new Event('foldAll');
		window.dispatchEvent(foldAllEvent);
	};

	return (
		<PlayListHeaderContainer>
			<SmallIconButton Icon={<FoldGroup />} color="black300" onClick={foldAll} text="전체접기" />
			<div id="title-text">
				<Text text="재생목록" fontSize={18} />
			</div>
			<IconButton id="close-modal" Icon={<Down />} onClick={closeModal} size="s" color="black300" />
		</PlayListHeaderContainer>
	);
}

export default PlayListHeader;
