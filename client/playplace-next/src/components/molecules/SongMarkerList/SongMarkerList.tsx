import { v4 } from 'uuid';
import SongMarkerListItem from '@/components/atoms/SongMarkerListItem/SongMarkerListItem';
import getRandomInt from '@/utils/common/randomInt';
import { IAroundPeople } from '@/types/radar';
import { useEffect, useMemo } from 'react';
import SongMarkerListContainer from './style';

interface SongMarkerListProps {
	markerList: (IAroundPeople | null)[];
	handleMarkerInfoOpen: (detailItem: IAroundPeople) => void;
}

function SongMarkerList(props: SongMarkerListProps) {
	const { markerList, handleMarkerInfoOpen } = props;
	const memoizedMarkerList = useMemo(() => markerList, [markerList]);

	useEffect(() => {
		console.log('markerList', markerList);
	});

	return (
		<SongMarkerListContainer>
			{memoizedMarkerList.map((item, i) => (
				<div key={v4()} className={`item ${i}`}>
					{!item ? (
						<></>
					) : (
						<SongMarkerListItem
							$bottom={getRandomInt(0, 100)}
							$left={getRandomInt(0, 100)}
							item={item}
							handleMarkerInfoOpen={handleMarkerInfoOpen}
						/>
					)}
				</div>
			))}
		</SongMarkerListContainer>
	);
}

export default SongMarkerList;
