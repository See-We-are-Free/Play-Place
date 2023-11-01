import HomeAlbumItems from '@/components/atoms/HomeAlbumItems/HomeAlbumItems';
import { StaticImageData } from 'next/image';
import Text from '@/components/atoms/Text/Text';
import HomeAlbumContainer, { HomeAlbumInfo } from './style';

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
			<HomeAlbumInfo>
				<Text text={title} color="default" fontSize={16} />
				<Text text={artist} color="gray" fontSize={12} />
			</HomeAlbumInfo>
		</HomeAlbumContainer>
	);
}

export default HomeAlbum;
