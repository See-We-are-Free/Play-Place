import LandMarkIcon from '@root/public/assets/icons/LandMark.svg';
import Image from 'next/image';
import TempImage from '@root/public/assets/images/hypeBoy.jpg';
import { ImageWrapper, SongMarkerContainer, SongMarkerListItemContainer } from './style';
import Text from '../Text/Text';

interface SongMarkerListItemProps {
	$bottom?: number;
	$left?: number;
	nickname: string;
}

function SongMarkerListItem(props: SongMarkerListItemProps) {
	const { $bottom = 50, $left = 50, nickname } = props;

	return (
		<SongMarkerListItemContainer>
			<button type="button">
				<SongMarkerContainer $bottom={$bottom} $left={$left}>
					<ImageWrapper>
						<Image alt="TempImage" src={TempImage} />
					</ImageWrapper>
					<LandMarkIcon />
					<Text text={nickname} fontSize={12} />
				</SongMarkerContainer>
			</button>
		</SongMarkerListItemContainer>
	);
}

export default SongMarkerListItem;
