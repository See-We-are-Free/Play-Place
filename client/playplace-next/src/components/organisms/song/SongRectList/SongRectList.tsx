import React, { WheelEvent, useRef } from 'react';
import SongSubtitle from '@/components/molecules/song/SongSubtitle/SongSubtitle';
import { TIME_TITLE } from '@/constants/home';
import { TimezoneSongList } from '@/types/songs';
import SongRectItems from '@/components/molecules/song/SongRectItems/SongRectItems';
import Text from '@/components/atoms/Text/Text';
import RoundPlay from '@root/public/assets/icons/RoundPlay.svg';
import SongRectListContainer, {
	SongRectListContent,
	SongRectListInfo,
	SongRectListInfoPlay,
	SongRectListPlay,
	SongRectListScroll,
} from './style';

interface SongRectListProps {
	timeZoneSongList: TimezoneSongList;
}

function SongRectList(props: SongRectListProps) {
	const { timeZoneSongList } = props;

	const containerRef = useRef<HTMLUListElement | null>(null);

	const handleScroll = (e: WheelEvent<HTMLUListElement>) => {
		const container = containerRef.current;
		if (container) {
			container.scrollLeft += e.deltaY;
		}
	};

	return (
		<SongRectListContainer>
			<SongSubtitle colorSubtitle={TIME_TITLE[timeZoneSongList.timezone]} normalSubtitle="듣기 좋은 음악" />
			<SongRectListScroll onWheel={handleScroll} ref={containerRef}>
				{timeZoneSongList.songs.map((v) => (
					<SongRectListContent key={v.youtubeId}>
						<SongRectItems imgSrc={v.albumImg} />
						<SongRectListInfoPlay>
							<SongRectListInfo>
								<Text text={v.title} color="default" fontSize={14} $textSlide />
								<Text text={v.artist} color="gray" fontSize={10} $textSlide />
							</SongRectListInfo>
							<SongRectListPlay type="button" onClick={() => {}}>
								<RoundPlay />
							</SongRectListPlay>
						</SongRectListInfoPlay>
					</SongRectListContent>
				))}
			</SongRectListScroll>
		</SongRectListContainer>
	);
}

export default SongRectList;
