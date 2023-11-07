import CustomBottomSheet from '@/components/molecules/CustomBottomSheet/CustomBottomSheet';
import { BottomContent } from '@/components/atoms/SongMarkerListItem/style';
import TempImage from '@root/public/assets/images/hypeBoy.jpg';
import Image from 'next/image';
import { IAroundPeople } from '@/types/radar';
import { Dispatch, SetStateAction } from 'react';
import SongPlayWave from '@root/public/assets/icons/SongPlayWave.svg';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import {
	Artist,
	BottomSheetImageWrapper,
	Info,
	MarkerDetailInfoBody,
	MarkerDetailInfoHeader,
	NicknameWrapper,
	Title,
} from './style';

interface MarkerDetailInfoProps {
	item: IAroundPeople;
	isDetailOpen: boolean;
	setIsDetailOpen: Dispatch<SetStateAction<boolean>>;
}

function MarkerDetailInfo(props: MarkerDetailInfoProps) {
	const { item, isDetailOpen, setIsDetailOpen } = props;

	return (
		<CustomBottomSheet open={isDetailOpen} setOpen={setIsDetailOpen}>
			<BottomContent>
				<ContentLayout $padding="20px">
					<MarkerDetailInfoHeader>
						<SongPlayWave />
						<NicknameWrapper>{item.nickname}</NicknameWrapper>
						<span>님이 현재 듣고 있는 노래</span>
					</MarkerDetailInfoHeader>
					<MarkerDetailInfoBody>
						<BottomSheetImageWrapper>
							<Image alt="TempImage" src={TempImage} />
						</BottomSheetImageWrapper>
						<Info>
							<Title>{item.title}</Title>
							<Artist>{item.artist}</Artist>
						</Info>
					</MarkerDetailInfoBody>
				</ContentLayout>
			</BottomContent>
		</CustomBottomSheet>
	);
}

export default MarkerDetailInfo;
