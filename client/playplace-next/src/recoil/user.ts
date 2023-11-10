import { UserInfo } from '@/types/auth';
import { atom } from 'recoil';

/**
 * 유저 정보를 관리하는 아톰
 */
const userInfoState = atom<UserInfo>({
	key: 'userInfoState',
	default: { nickname: '', profileImg: 0, push: false, shake: false },
});

export default userInfoState;
