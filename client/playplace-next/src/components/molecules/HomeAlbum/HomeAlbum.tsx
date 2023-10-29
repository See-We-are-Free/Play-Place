import HomeAlbumItems from '@/components/atoms/HomeAlbumItems/HomeAlbumItems';
import { WheelEvent, useRef } from 'react';
import LocationSongItem from '@/types/home';
import HomeAlbumContainer, { HomeAlbumArtist, HomeAlbumContent, HomeAlbumTitle } from './style';

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
					<HomeAlbumTitle>{v.title}</HomeAlbumTitle>
					<HomeAlbumArtist>{v.artist}</HomeAlbumArtist>
				</HomeAlbumContent>
			))}
		</HomeAlbumContainer>
	);
}

export default HomeAlbum;
