import { BiHomeAlt2 } from 'react-icons/bi';
import { BiMapAlt } from 'react-icons/bi';
import { BiRadar } from 'react-icons/bi';
import { BiSearch } from 'react-icons/bi';

export const MENUS = [
	{ title: '홈', icon: <BiHomeAlt2 />, path: '/' },
	{ title: '플레이맵', icon: <BiMapAlt />, path: '/map' },
	{ title: '플레이더', icon: <BiRadar />, path: '/radar' },
	{ title: '검색', icon: <BiSearch />, path: '/search' },
];
