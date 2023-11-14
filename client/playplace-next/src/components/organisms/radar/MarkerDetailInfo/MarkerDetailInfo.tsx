import CustomBottomSheet from '@/components/molecules/CustomBottomSheet/CustomBottomSheet';
import { BottomContent } from '@/components/atoms/SongMarkerListItem/style';
import Image from 'next/image';
import Play from '@root/public/assets/icons/Play.svg';
import { IAroundPeople } from '@/types/radar';
import { Dispatch, SetStateAction } from 'react';
import SongPlayWave from '@root/public/assets/icons/SongPlayWave.svg';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import {
	Artist,
	BodyLeft,
	BottomSheetImageWrapper,
	Info,
	MarkerDetailInfoBody,
	MarkerDetailInfoHeader,
	NicknameWrapper,
	PlayButton,
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
						<div>
							<NicknameWrapper>{item.nickname}</NicknameWrapper>
							<span>님이 현재 듣고 있는 음악</span>
						</div>
					</MarkerDetailInfoHeader>
					<MarkerDetailInfoBody>
						<BodyLeft>
							<BottomSheetImageWrapper>
								<Image width="100" height="100" alt={`${item.title} 앨범 이미지`} src={item.albumImg} />
							</BottomSheetImageWrapper>
							<Info>
								<Title>{item.title}</Title>
								<Artist>{item.artist}</Artist>
							</Info>
						</BodyLeft>
						<PlayButton type="button" onClick={() => console.log('하이')}>
							<Play />
						</PlayButton>
					</MarkerDetailInfoBody>
				</ContentLayout>
			</BottomContent>
		</CustomBottomSheet>
	);
}

export default MarkerDetailInfo;
