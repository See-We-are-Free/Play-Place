import { UserInfo } from '@/types/auth';
import { getUserInfoApi } from '@/utils/api/auth';
import { getSongShareInfoApi } from '@/utils/api/radar';
import UserInfoContext, { UserInfoContextType } from '@/utils/common/UserInfoContext';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

function UserInfoProvider({ children }: { children: ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const [user, setUser] = useState<UserInfo>({
		nickname: '',
		profileImg: 0,
		isPush: false,
		isShake: false,
	});
	const [isSongShare, setIsSongShare] = useState<boolean>(false);

	/**
	 * 로그인(또는 회원가입) 페이지인지 확인하는 함수
	 * @return 로그인(또는 회원가입) 페이지일 경우 true, 아닐 경우 false 반환
	 */
	const loginPathCheck = useCallback(() => {
		if (pathname === '/login' || pathname === '/signup') {
			return true;
		}
		return false;
	}, [pathname]);

	/**
	 * 로그인 상태를 확인하는 함수
	 * @return 로그인 상태라면 true, 아닐 경우 false 반환
	 */
	const loginCheck = useCallback(() => {
		if (!localStorage.getItem('accessToken')) {
			return false;
		}
		return true;
	}, []);

	/**
	 * 사용자 정보를 저장하는 함수
	 */
	const getUserInfo = useCallback(async () => {
		const response = await getUserInfoApi();
		if (response.status === 200) {
			setUser(response.data.data);
		}
	}, []);

	/**
	 * 플레이더 공유 상태를 저장하는 함수
	 */
	const getSongShareInfo = useCallback(async () => {
		const response = await getSongShareInfoApi();
		if (response.status === 200) {
			setIsSongShare(response.data.data);
		}
	}, []);

	useEffect(() => {
		if (loginPathCheck()) {
			localStorage.removeItem('accessToken');
			return;
		}

		if (!loginCheck()) {
			router.push('/login');
			return;
		}

		if (user.nickname === '') {
			getUserInfo();
			getSongShareInfo();
		} else {
			console.log('유저 정보 ==============');
			console.log('accessToken', localStorage.getItem('accessToken'));
			console.log('userInfo', user);
			console.log('isSongShare', isSongShare);
		}
	}, [getSongShareInfo, getUserInfo, isSongShare, loginCheck, loginPathCheck, router, user]);

	const value: UserInfoContextType = useMemo(() => {
		return {
			user,
			setUser,
			isSongShare,
			setIsSongShare,
		};
	}, [isSongShare, user]);

	return <UserInfoContext.Provider value={value}>{children}</UserInfoContext.Provider>;
}

export default UserInfoProvider;
