import HomeAlbumItems from '@/components/atoms/HomeAlbumItems/HomeAlbumItems';
import { StaticImageData } from 'next/image';
import HomeAlbumContainer, { HomeAlbumArtist, HomeAlbumTitle } from './style';

interface HomeAlbumProps {
	imgSrc: StaticImageData;
	title: string;
	artist: string;
}
function HomeAlbum(props: HomeAlbumProps) {
	const { imgSrc, title, artist } = props;

	return (
		<HomeAlbumContainer>
			<HomeAlbumItems imgSrc={imgSrc} />
			<HomeAlbumTitle>{title}</HomeAlbumTitle>
			<HomeAlbumArtist>{artist}</HomeAlbumArtist>
		</HomeAlbumContainer>
	);
}

export default HomeAlbum;
