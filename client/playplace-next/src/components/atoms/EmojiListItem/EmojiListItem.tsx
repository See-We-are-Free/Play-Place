import Image from 'next/image';
import { PROFILE_IMAGES } from '@/constants/member';
import ItemWrapper from './style';

interface EmojiListItemProps {
	idx: number;
	handleSelectEmoji: (idx: number) => void;
	profileImg: number | null;
}

function EmojiListItem(props: EmojiListItemProps) {
	const { idx, handleSelectEmoji, profileImg } = props;
	return (
		<ItemWrapper>
			<button type="button" onClick={() => handleSelectEmoji(idx)} className={`${profileImg === idx && 'active'}`}>
				<Image src={PROFILE_IMAGES[idx]} alt={`프로필 이미지 ${idx}`} />
			</button>
		</ItemWrapper>
	);
}

export default EmojiListItem;
