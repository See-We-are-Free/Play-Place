import { v4 } from 'uuid';
import SongMarkerListItem from '@/components/atoms/SongMarkerListItem/SongMarkerListItem';
import getRandomInt from '@/utils/common/randomInt';
import { IAroundPeople } from '@/types/radar';
import SongMarkerListContainer from './style';

interface SongMarkerListProps {
	songMarkerList: IAroundPeople[];
}

function SongMarkerList(props: SongMarkerListProps) {
	const { songMarkerList } = props;

	console.log('songMarkerList', songMarkerList);

	return (
		<SongMarkerListContainer>
			{/* {songMarkerList.map((_, i) => ( */}
			{new Array(30).fill(0).map((_, i) => (
				<div key={v4()} className={`item ${i}`}>
					{/* {!(i === 12 || i === 17) && 값이 비어있지 않으면 ? ( */}
					{i === 12 || i === 17 ? (
						<></>
					) : (
						<SongMarkerListItem $bottom={getRandomInt(0, 100)} $left={getRandomInt(0, 100)} nickname="조이라" />
					)}
				</div>
			))}
		</SongMarkerListContainer>
	);
}

export default SongMarkerList;
