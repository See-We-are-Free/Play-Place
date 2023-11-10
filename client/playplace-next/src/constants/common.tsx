import Home from '@root/public/assets/icons/Home.svg';
import Map from '@root/public/assets/icons/Map.svg';
import Radar from '@root/public/assets/icons/Radar.svg';
import Search from '@root/public/assets/icons/Search.svg';

interface HeaderListType {
	[key: string]: string;
}

const MENUS = [
	{ title: '홈', icon: <Home />, path: '/' },
	{ title: '플레이맵', icon: <Map />, path: '/map' },
	{ title: '플레이더', icon: <Radar />, path: '/radar' },
	{ title: '검색', icon: <Search />, path: '/search' },
];

export const HEADER_LIST: HeaderListType = {
	// home: 'home',
	// map: 'map',
	radar: '플레이더',
	my: '마이페이지',
	// back: 'back',
	playlist: '재생목록',
	search: '검색',
	signup: '회원가입',
	chatbot: '플로디',
};

export const MY_MENUS: HeaderListType = {
	profile: '프로필',
	plody: '플로디',
	like: '좋아요',
	setting: '설정',
};

export default MENUS;
