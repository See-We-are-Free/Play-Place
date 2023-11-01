import EmojiListItem from '@/components/atoms/EmojiListItem/EmojiListItem';
import Text from '@/components/atoms/Text/Text';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import { PROFILE_IMAGES } from '@/constants/member';
import { v4 } from 'uuid';
import EmojiListWrapper from './style';

interface EmojiListProps {
	handleSelectEmoji: (idx: number) => void;
	profileImg: number | null;
}

function EmojiList(props: EmojiListProps) {
	const { handleSelectEmoji, profileImg } = props;

	return (
		<ContentLayout>
			<div style={{ textAlign: 'center', marginBottom: 10 }}>
				<Text text="나를 표현할 이모지를 골라주세요!" fontSize={16} />
			</div>
			<div style={{ position: 'relative', paddingBottom: 80 }}>
				<EmojiListWrapper>
					<ul>
						{new Array(Object.keys(PROFILE_IMAGES).length).fill(0).map((_, idx) => (
							<EmojiListItem key={v4()} idx={idx} handleSelectEmoji={handleSelectEmoji} profileImg={profileImg} />
						))}
					</ul>
				</EmojiListWrapper>
			</div>
		</ContentLayout>
	);
}

export default EmojiList;
