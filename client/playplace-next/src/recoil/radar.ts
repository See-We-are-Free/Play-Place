import { atom } from 'recoil';

/**
 * 노래 공유 상태를 관리하는 아톰
 */
const songShareState = atom<boolean>({
	key: 'songShareState',
	default: false,
});

export default songShareState;

/**
 * 노래 공유 상태 초기값을 서버에서 받아옴
 */
// export const getSongShareState = selector<boolean>({
// 	key: 'getSongShareState',
// 	get: async () => {
// 		const response = await getSongShareInfo();
// 		return response;
// 	},
// 	// set: ({ set }, newValue) => {
// 	// 	set(songShareState, newValue);
// 	// },
// });
