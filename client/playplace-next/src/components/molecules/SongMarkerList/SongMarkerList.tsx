import { v4 } from 'uuid';
import SongMarkerListItem from '@/components/atoms/SongMarkerListItem/SongMarkerListItem';
import getRandomInt from '@/utils/common/randomInt';
import { IAroundPeople } from '@/types/radar';
import { useEffect } from 'react';
import SongMarkerListContainer from './style';

interface SongMarkerListProps {
	markerList: (IAroundPeople | null)[];
}

function SongMarkerList(props: SongMarkerListProps) {
	const { markerList } = props;

	useEffect(() => {
		console.log('markerList', markerList);
	});

	return (
		<SongMarkerListContainer>
			{markerList.map((item, i) => (
				<div key={v4()} className={`item ${i}`}>
					{!item ? (
						<></>
					) : (
						<SongMarkerListItem $bottom={getRandomInt(0, 100)} $left={getRandomInt(0, 100)} item={item} />
					)}
				</div>
			))}
		</SongMarkerListContainer>
	);
}

export default SongMarkerList;
