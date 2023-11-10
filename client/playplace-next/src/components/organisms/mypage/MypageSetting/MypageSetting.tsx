import MypageToggle from '@/components/molecules/MypageToggle/MypageToggle';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import { ContentLayoutSizes, ToastStyles } from '@/types/styles.d';
import React, { useState } from 'react';
import Text from '@/components/atoms/Text/Text';
import { DeleteUserApi, logoutUserApi, patchPushApi, patchShakeApi } from '@/utils/api/auth';
import { useRouter } from 'next/navigation';
import CustomToast from '@/components/atoms/CustomToast/CustomToast';
import { useRecoilState } from 'recoil';
import userInfoState from '@/recoil/user';
import MypageSettingContainer, { MypagetSettingText } from './style';

function MypageSetting() {
	const [user] = useRecoilState(userInfoState);
	const [push, setPush] = useState<boolean>(user.isPush);
	const [shake, setShake] = useState<boolean>(user.isShake);
	const router = useRouter();

	const functionApprove: { [key: number]: string } = { 1: '동의', 0: '미동의' };

	const handlePush = async () => {
		try {
			const response = await patchPushApi();
			if (response.status === 200) {
				console.log(response);
				setPush(!push);
				CustomToast(ToastStyles.success, `푸시알림 ${functionApprove[response.data.data]} 하셨습니다`);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleShake = async () => {
		try {
			const response = await patchShakeApi();
			if (response.status === 200) {
				setShake(!shake);
				CustomToast(ToastStyles.success, `흔들기 ${functionApprove[response.data.data]} 하셨습니다`);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const deleteUser = async () => {
		try {
			const response = await DeleteUserApi();
			if (response.status === 200) {
				CustomToast(ToastStyles.success, 'PlayPlace를 이용해주셔서 감사합니다');
				router.push('/login');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const logoutUser = async () => {
		try {
			const response = await logoutUserApi();
			if (response.status === 200) {
				console.log(response);
				router.push('/login');
				localStorage.removeItem('accessToken');
				CustomToast(ToastStyles.success, `${user.nickname}님 감사합니다`);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<ContentLayout size={ContentLayoutSizes.md}>
			<MypageSettingContainer>
				<MypageToggle functionOnOff={push} handleFunction={handlePush} title="푸시 알림 동의" />
				<MypageToggle functionOnOff={shake} handleFunction={handleShake} title="흔들어서 플로디 열기" />
				<MypagetSettingText>
					<Text text="로그아웃" fontSize={14} color="default" onClick={logoutUser} />
				</MypagetSettingText>
				<MypagetSettingText>
					<Text text="회원탈퇴" fontSize={14} color="default" onClick={deleteUser} />
				</MypagetSettingText>
			</MypageSettingContainer>
		</ContentLayout>
	);
}

export default MypageSetting;
