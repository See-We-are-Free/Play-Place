'use client';

import Header from '@/components/molecules/Header/Header';
import LayoutWithHeader from '@/components/templates/layout/LayoutWithHeader/LayoutWithHeader';
import { HeaderStyles, ToastStyles } from '@/types/styles.d';
import MenuIcon from '@root/public/assets/icons/Menu.svg';
import Home from '@/components/pages/Home/Home';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import userInfoState from '@/recoil/user';
import { getUserInfoApi } from '@/utils/api/auth';
import CustomToast from '@/components/atoms/CustomToast/CustomToast';
import { useRouter } from 'next/navigation';
import MypageView from '@/components/organisms/MypageView/MypageView';

export default function HomePage() {
	const router = useRouter();
	const [isMyMenuOpen, setIsMyMenuOpen] = useState<boolean>(false);
	const [user, setUserInfo] = useRecoilState(userInfoState);

	const handleMyPageOn = () => {
		console.log('열려');
		setIsMyMenuOpen(true);
	};

	const getUserInfo = useCallback(async () => {
		try {
			const response = await getUserInfoApi();
			if (response.status === 200) {
				console.log('getUserInfo', response);
				setUserInfo(response.data.data);
			} else {
				CustomToast(ToastStyles.error, '로그인이 필요한 서비스입니다.');
				router.push('/login');
			}
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		if (window.AndMap) {
			window.AndMap.successLocate();
		}
	}, []);

	const header = (
		<>
			<Header $headerType={HeaderStyles.home} location="장덕동">
				<button type="button" onClick={handleMyPageOn}>
					<MenuIcon />
				</button>
			</Header>
		</>
	);

	useEffect(() => {
		if (user.nickname === '') {
			getUserInfo();
		} else {
			console.log('user', user);
		}
	}, [user]);

	return (
		<>
			<LayoutWithHeader header={header}>
				<Home />
			</LayoutWithHeader>
			<MypageView $isMyMenuOpen={isMyMenuOpen} setIsMyMenuOpen={setIsMyMenuOpen} />
		</>
	);
}
