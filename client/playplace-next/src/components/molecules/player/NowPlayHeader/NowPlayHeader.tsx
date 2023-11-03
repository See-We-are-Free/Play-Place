import React from 'react';
import { useRecoilState } from 'recoil';
import { playModalState } from '@/recoil/play';
import IconButton from '@/components/atoms/IconButton/IconButton';
import Down from '@root/public/assets/icons/Down.svg';
import More from '@root/public/assets/icons/More.svg';
import NowPlayHeaderContainer from './style';

function NowPlayHeader() {
	const [, setPlayModal] = useRecoilState(playModalState);

	const closeModal = () => {
		setPlayModal('none');
	};

	return (
		<NowPlayHeaderContainer>
			<IconButton Icon={<More />} onClick={closeModal} size="s" color="black300" />
			<IconButton Icon={<Down />} onClick={closeModal} size="s" color="black300" />
		</NowPlayHeaderContainer>
	);
}

export default NowPlayHeader;
