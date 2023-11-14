import SongSubtitle from '@/components/molecules/song/SongSubtitle/SongSubtitle';
import WEATHER_TITLE from '@/constants/home';
import { WeatherSongList } from '@/types/songs';
import React, { WheelEvent, useRef } from 'react';
import SongSquareItems from '@/components/molecules/song/SongSquareItems/SongSquareItems';
import Text from '@/components/atoms/Text/Text';
import usePlayer from '@/hooks/player/usePlayer';
import SongSquareListContainer, { SongSquareListContent, SongSquareListScroll } from './style';

interface SongSquareListProps {
	weatherSongList: WeatherSongList;
}

function SongSquareList(props: SongSquareListProps) {
	const { weatherSongList } = props;
	const { playNewSong } = usePlayer();

	const containerRef = useRef<HTMLUListElement | null>(null);

	const handleScroll = (e: WheelEvent<HTMLUListElement>) => {
		const container = containerRef.current;
		if (container) {
			container.scrollLeft += e.deltaY;
		}
	};
	return (
		<SongSquareListContainer>
			<SongSubtitle colorSubtitle={WEATHER_TITLE[weatherSongList.weather]} normalSubtitle="듣기 좋은 음악" />
			<SongSquareListScroll onWheel={handleScroll} ref={containerRef}>
				{weatherSongList.songs ? (
					weatherSongList.songs.map((v) => (
						<SongSquareListContent key={v.youtubeId}>
							<SongSquareItems imgSrc={v.albumImg || ''} onClick={() => playNewSong(v)} />
							<Text text={v.title} color="default" fontSize={14} $overflowHidden />
							<Text text={v.artist} color="gray" fontSize={10} $overflowHidden />
						</SongSquareListContent>
					))
				) : (
					<></>
				)}
			</SongSquareListScroll>
		</SongSquareListContainer>
	);
}

export default SongSquareList;
