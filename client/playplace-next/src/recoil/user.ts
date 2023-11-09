import { UserInfo } from '@/types/auth';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

/**
 * 유저 정보를 관리하는 아톰
 */
const userInfoState = atom<UserInfo | null>({
	key: 'userInfoState',
	default: null,
	effects_UNSTABLE: [persistAtom],
});

export default userInfoState;
