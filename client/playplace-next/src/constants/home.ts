interface HomeTitleType {
	[key: string]: string;
}

const WEATHER_TITLE: HomeTitleType = {
	SUN: '맑은 날',
	SNOW: '눈오는 날',
	RAIN: '비오는 날',
	CLOUD: '구름낀 날',
};

export const TIME_TITLE: HomeTitleType = {
	DAWN: '새벽에',
	MORNING: '아침에',
	LUNCH: '점심에',
	EVENING: '저녁에',
};

export default WEATHER_TITLE;
