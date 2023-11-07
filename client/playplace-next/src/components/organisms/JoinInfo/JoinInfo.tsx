'use client';

import { JoinInfoType } from '@/types/auth';
import { joinApi } from '@/utils/api/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/atoms/Button/Button';
import { ButtonStyles, ToastStyles } from '@/types/styles.d';

import { AxiosHeaders } from 'axios';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import EmojiList from '@/components/molecules/EmojiList/EmojiList';
import Text from '@/components/atoms/Text/Text';
import CustomToast from '@/components/atoms/CustomToast/CustomToast';
import NicknameContainer from './style';

interface JoinInfoProps {
	email: string;
	googleToken: string;
}

function JoinInfo(props: JoinInfoProps) {
	const { email, googleToken } = props;
	const router = useRouter();
	const [nickname, setNickname] = useState<string | null>(null);
	const [profileImg, setProfileImg] = useState<number | null>(null);

	const join = async () => {
		try {
			if (email && googleToken && nickname && profileImg !== null) {
				const body: JoinInfoType = {
					email,
					googleToken,
					nickname,
					profileImg,
				};
				const response = await joinApi({ body });
				if (response && response.status === 200) {
					console.log(response);
					const { headers } = response;
					if (headers instanceof AxiosHeaders) {
						const token = headers.get('authorization');
						console.log(token);
						CustomToast(ToastStyles.success, `${nickname} 님 환영합니다.`);
						localStorage.setItem('accessToken', `${token}`);
						router.push('/');
					}
				}
			} else {
				CustomToast(ToastStyles.error, '값을 입력해주세요!');
				console.log('email', email);
				console.log('googleToken', googleToken);
				console.log('nickname', nickname);
				console.log('profileImg', profileImg);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleSelectEmoji = (idx: number) => {
		setProfileImg(idx);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNickname(event.target.value);
	};

	return (
		<>
			<EmojiList handleSelectEmoji={handleSelectEmoji} profileImg={profileImg} />
			<ContentLayout>
				<NicknameContainer>
					<Text text="닉네임" fontSize={16} />
					<input
						type="text"
						onChange={handleInputChange}
						value={nickname || ''}
						placeholder="한글 또는 영문 10자 이내"
						maxLength={10}
					/>
				</NicknameContainer>
			</ContentLayout>
			<Button buttonType={ButtonStyles.outlinePrimaryBottom} content="가입하기" socialImg={false} onClick={join} />
		</>
	);
}

export default JoinInfo;
