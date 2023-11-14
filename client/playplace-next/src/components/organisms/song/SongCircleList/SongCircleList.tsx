import SongCircleItems from '@/components/molecules/song/SongCircleItems/SongCircleItems';
import { WheelEvent, useRef } from 'react';
import Text from '@/components/atoms/Text/Text';
import { AreaSongList } from '@/types/songs';
import SongSubtitle from '@/components/molecules/song/SongSubtitle/SongSubtitle';
import SongCircleListContainer, { SongCircleListContent, SongCircleListInfo, SongCircleListScroll } from './style';

interface SongCircleListProps {
	locationSongList: AreaSongList;
}

function SongCircleList(props: SongCircleListProps) {
	const { locationSongList } = props;

	const containerRef = useRef<HTMLUListElement | null>(null);

	const handleScroll = (e: WheelEvent<HTMLUListElement>) => {
		const container = containerRef.current;
		if (container) {
			container.scrollLeft += e.deltaY;
		}
	};
	return (
		<SongCircleListContainer>
			<SongSubtitle colorSubtitle="이번주" normalSubtitle="가장 많이 재생된 음악" />
			<SongCircleListScroll onWheel={handleScroll} ref={containerRef}>
				{locationSongList.songs.map((v) => (
					<SongCircleListContent key={v.youtubeId}>
						<SongCircleItems imgSrc={v.albumImg} />
						<SongCircleListInfo>
							<Text text={v.title} color="default" fontSize={16} $textSlide $overflowHidden />
							<Text text={v.artist} color="gray" fontSize={12} />
						</SongCircleListInfo>
					</SongCircleListContent>
				))}
			</SongCircleListScroll>
		</SongCircleListContainer>
	);
}

export default SongCircleList;
