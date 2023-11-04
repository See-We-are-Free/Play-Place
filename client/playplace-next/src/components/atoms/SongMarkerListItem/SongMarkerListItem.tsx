import LandMarkIcon from '@root/public/assets/icons/LandMark.svg';
import Image from 'next/image';
import TempImage from '@root/public/assets/images/hypeBoy.jpg';
import CustomBottomSheet from '@/components/molecules/CustomBottomSheet/CustomBottomSheet';
import { useState } from 'react';
import { IAroundPeople } from '@/types/radar';
import {
	BottomContent,
	BottomSheetImageWrapper,
	ImageWrapper,
	SongMarkerButton,
	SongMarkerContainer,
	SongMarkerListItemContainer,
} from './style';
import Text from '../Text/Text';

interface SongMarkerListItemProps {
	$bottom?: number;
	$left?: number;
	item: IAroundPeople;
}

function SongMarkerListItem(props: SongMarkerListItemProps) {
	const { $bottom = 50, $left = 50, item } = props;
	const [isOpen, setIsOpen] = useState(false);

	const hadnleMarkerInfoOpen = () => {
		console.log('hadnleMarkerInfoOpen');
		setIsOpen(true);
	};

	return (
		<>
			<SongMarkerListItemContainer>
				<SongMarkerButton $bottom={$bottom} $left={$left} type="button" onClick={hadnleMarkerInfoOpen}>
					<SongMarkerContainer>
						<ImageWrapper>
							<Image alt="TempImage" src={TempImage} />
						</ImageWrapper>
						<LandMarkIcon />
						<Text text={item.nickname} fontSize={12} />
					</SongMarkerContainer>
				</SongMarkerButton>
			</SongMarkerListItemContainer>
			{isOpen && (
				<CustomBottomSheet open={isOpen} setOpen={setIsOpen}>
					<BottomContent>
						<div>
							<div>{item.nickname} 님이 현재 듣고 있는 노래</div>
							<div>
								<BottomSheetImageWrapper>
									<Image alt="TempImage" src={TempImage} />
								</BottomSheetImageWrapper>
								<div>
									<p>{item.title}</p>
									<p>{item.artist}</p>
								</div>
							</div>
						</div>
					</BottomContent>
				</CustomBottomSheet>
			)}
		</>
	);
}

export default SongMarkerListItem;
