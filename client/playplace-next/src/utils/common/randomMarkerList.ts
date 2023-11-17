import { IAroundPeople } from '@/types/radar';

interface LevelRange {
	start: number;
	end: number;
}

// 각 레벨에 대한 인덱스 범위를 명시하는 타입을 생성
type LevelRanges = {
	[level in 0 | 1 | 2]: LevelRange;
};

function getRandomMarkerList(markerList: IAroundPeople[]): (IAroundPeople | null)[] {
	const nullArray: (IAroundPeople | null)[] = new Array(30).fill(null);
	const excludedIndexes = new Set([12, 17]); // 할당을 피할 인덱스들

	// 랜덤 인덱스를 저장하기 위한 배열을 생성
	const levelRanges: LevelRanges = {
		0: { start: 0, end: 11 },
		1: { start: 13, end: 20 }, // 12와 17은 제외
		2: { start: 21, end: 29 }, // 배열이 0부터 29까지이므로 마지막 인덱스는 29
	};

	markerList.forEach((item) => {
		const level = item.level as 0 | 1 | 2; // 타입 가드 사용(들어오는 값이 0, 1, 2라는 것을 명시)
		const range = levelRanges[level];
		let randomIndex;

		// 해당 레벨 범위 내에서만 랜덤 인덱스를 선택
		do {
			randomIndex = range.start + Math.floor(Math.random() * (range.end - range.start + 1));
		} while (nullArray[randomIndex] !== null || excludedIndexes.has(randomIndex));

		nullArray[randomIndex] = item;
	});

	return nullArray;
}

export default getRandomMarkerList;
