import { UserInfo } from '@/types/auth';
import { getUserInfoApi } from '@/utils/api/auth';
import { getSongShareInfoApi } from '@/utils/api/radar';
import UserInfoContext, { UserInfoContextType } from '@/utils/common/UserInfoContext';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

function UserInfoProvider({ children }: { children: ReactNode }) {
	const router = useRouter();
	const params = useSearchParams();
	const pathname = usePathname();
	const [user, setUser] = useState<UserInfo>({
		nickname: '',
		profileImg: 0,
		push: false,
		shake: false,
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

	/**
	 * 현재 위치를 반환하는 함수
	 * @return lat: number, lng: number
	 */
	const getLocation = () => {
		if (typeof window !== 'undefined' && window.AndMap) {
			const data = window.AndMap.getLastKnownLocation();
			if (data) return JSON.parse(data);
			return {
				lat: 35.205534,
				lng: 126.811585,
			};
		}

		return {
			lat: 35.205534,
			lng: 126.811585,
		};
	};

	useEffect(() => {
		if (params.get('accessToken')) {
			localStorage.setItem('accessToken', params.get('accessToken') || '');
			router.push('/');
		} else if (pathname === '/signup') {
			console.log('회원가입');
		} else if (!localStorage.getItem('accessToken')) {
			router.push('/login');
		} else if (localStorage.getItem('accessToken') && user.nickname === '') {
			getUserInfo();
			getSongShareInfo();
		}

		if (user.nickname !== '') {
			// TODO :: 최종 배포 후 날릴거
			console.log('accessToken', localStorage.getItem('accessToken'));
			console.log('userInfo', user);
			console.log('isSongShare', isSongShare);
		}
	}, [getSongShareInfo, getUserInfo, isSongShare, loginCheck, loginPathCheck, params, pathname, router, user]);

	const value: UserInfoContextType = useMemo(() => {
		return {
			user,
			setUser,
			isSongShare,
			setIsSongShare,
			getLocation,
		};
	}, [isSongShare, user]);

	return <UserInfoContext.Provider value={value}>{children}</UserInfoContext.Provider>;
}

export default UserInfoProvider;
