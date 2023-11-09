import LandMarkIcon from '@root/public/assets/icons/LandMark.svg';
import Image from 'next/image';
import TempImage from '@root/public/assets/images/hypeBoy.jpg';
import { IAroundPeople } from '@/types/radar';
import { ImageWrapper, SongMarkerButton, SongMarkerContainer, SongMarkerListItemContainer } from './style';
import Text from '../Text/Text';

interface SongMarkerListItemProps {
	$bottom?: number;
	$left?: number;
	item: IAroundPeople;
	handleMarkerInfoOpen: (detailItem: IAroundPeople) => void;
}

function SongMarkerListItem(props: SongMarkerListItemProps) {
	const { $bottom = 50, $left = 50, item, handleMarkerInfoOpen } = props;

	return (
		<>
			<SongMarkerListItemContainer>
				<SongMarkerButton $bottom={$bottom} $left={$left} type="button" onClick={() => handleMarkerInfoOpen(item)}>
					<SongMarkerContainer>
						<ImageWrapper>
							<Image alt="TempImage" src={TempImage} />
						</ImageWrapper>
						<LandMarkIcon />
						<Text text={item.nickname} fontSize={12} />
					</SongMarkerContainer>
				</SongMarkerButton>
			</SongMarkerListItemContainer>
		</>
	);
}

export default SongMarkerListItem;