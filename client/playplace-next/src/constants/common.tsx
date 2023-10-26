import Home from '@root/public/assets/icons/Home.svg';
import Map from '@root/public/assets/icons/Map.svg';
import Radar from '@root/public/assets/icons/Radar.svg';
import Search from '@root/public/assets/icons/Search.svg';

const MENUS = [
	{ title: '홈', icon: <Home />, path: '/' },
	{ title: '플레이맵', icon: <Map />, path: '/map' },
	{ title: '플레이더', icon: <Radar />, path: '/radar' },
	{ title: '검색', icon: <Search />, path: '/search' },
];

export default MENUS;
