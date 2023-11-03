import React, { WheelEvent, useRef } from 'react';
import SongSubtitle from '@/components/molecules/song/SongSubtitle/SongSubtitle';
import { TIME_TITLE } from '@/constants/home';
import { TimezoneSong } from '@/types/songs';
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
	TimeZoneSongList: TimezoneSong;
}

function SongRectList(props: SongRectListProps) {
	const { TimeZoneSongList } = props;

	const containerRef = useRef<HTMLUListElement | null>(null);

	const handleScroll = (e: WheelEvent<HTMLUListElement>) => {
		const container = containerRef.current;
		if (container) {
			container.scrollLeft += e.deltaY;
		}
	};

	const test = () => {
		console.log(1);
	};

	return (
		<SongRectListContainer>
			<SongSubtitle colorSubtitle={TIME_TITLE[TimeZoneSongList.timezone]} normalSubtitle="듣기 좋은 음악" />
			<SongRectListScroll onWheel={handleScroll} ref={containerRef}>
				{TimeZoneSongList.songs.map((v) => (
					<SongRectListContent key={v.youtubeId}>
						<SongRectItems imgSrc={v.albumImg} />
						<SongRectListInfoPlay>
							<SongRectListInfo>
								<Text text={v.title} color="default" fontSize={14} />
								<Text text={v.artist} color="gray" fontSize={10} />
							</SongRectListInfo>
							<SongRectListPlay type="button" onClick={test}>
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