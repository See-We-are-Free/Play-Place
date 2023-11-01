import HomeAlbumItems from '@/components/atoms/HomeAlbumItems/HomeAlbumItems';
import { WheelEvent, useRef } from 'react';
import Text from '@/components/atoms/Text/Text';
import LocationSongItem from '@/types/home';
import HomeAlbumContainer, { HomeAlbumContent } from './style';

interface HomeAlbumProps {
	locationSongList: LocationSongItem[];
}

function HomeAlbum(props: HomeAlbumProps) {
	const { locationSongList } = props;

	const containerRef = useRef<HTMLUListElement | null>(null);

	const handleScroll = (e: WheelEvent<HTMLUListElement>) => {
		const container = containerRef.current;
		if (container) {
			container.scrollLeft += e.deltaY;
		}
	};
	return (
		<HomeAlbumContainer onWheel={handleScroll} ref={containerRef}>
			{locationSongList.map((v) => (
				<HomeAlbumContent key={v.albumImg}>
					<HomeAlbumItems imgSrc={v.albumImg} />
					<Text text={v.title} color="default" fontSize={16} />
					<Text text={v.artist} color="gray" fontSize={12} />
				</HomeAlbumContent>
			))}
		</HomeAlbumContainer>
	);
}

export default HomeAlbum;
