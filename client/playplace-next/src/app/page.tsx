'use client';

import Header from '@/components/molecules/Header/Header';
import LayoutWithHeader from '@/components/templates/layout/LayoutWithHeader/LayoutWithHeader';
import { HeaderStyles, ToastStyles } from '@/types/styles.d';
import MenuIcon from '@root/public/assets/icons/Menu.svg';
import Home from '@/components/pages/Home/Home';
import { useCallback, useEffect, useState } from 'react';
import MypageTemplate from '@/components/templates/MypageTemplate/MypageTemplate';
import { useRecoilState } from 'recoil';
import userInfoState from '@/recoil/user';
import { getUserInfoApi } from '@/utils/api/auth';
import CustomToast from '@/components/atoms/CustomToast/CustomToast';
import { useRouter } from 'next/navigation';

export default function HomePage() {
	const router = useRouter();
	const [isMyMenuOpen, setIsMyMenuOpen] = useState<boolean>(false);
	const [user, setUserInfo] = useRecoilState(userInfoState);

	const handleMyPageOn = () => {
		console.log('열려');
		setIsMyMenuOpen(true);
	};

	const getUserInfo = useCallback(async () => {
		const response = await getUserInfoApi();
		if (response.status === 200) {
			console.log('getUserInfo', response);
			setUserInfo(response.data.data);
		} else {
			CustomToast(ToastStyles.error, '로그인이 필요한 서비스입니다.');
			router.push('/login');
		}
	}, [router, setUserInfo]);

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
		if (!user) {
			getUserInfo();
		}
	}, [getUserInfo, setUserInfo, user]);

	return (
		<>
			<LayoutWithHeader header={header}>
				<Home />
			</LayoutWithHeader>
			<MypageTemplate $isMyMenuOpen={isMyMenuOpen} setIsMyMenuOpen={setIsMyMenuOpen} />
		</>
	);
}
