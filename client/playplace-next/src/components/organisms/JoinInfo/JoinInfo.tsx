'use client';

import { JoinInfoType } from '@/types/auth';
import { joinApi } from '@/utils/api/auth';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@/components/atoms/Button/Button';
import { ButtonStyles } from '@/types/styles.d';

import { AxiosHeaders } from 'axios';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import EmojiList from '@/components/molecules/EmojiList/EmojiList';
import Text from '@/components/atoms/Text/Text';
import NicknameContainer from './style';

function JoinInfo() {
	const params = useSearchParams();
	const router = useRouter();
	const [email, setEmail] = useState<string | null>(null);
	const [nickname, setNickname] = useState<string | null>(null);
	const [profileImg, setProfileImg] = useState<number | null>(null);

	const join = async () => {
		try {
			if (email && nickname && profileImg !== null) {
				const body: JoinInfoType = {
					email,
					nickname,
					profileImg,
				};
				const response = await joinApi({ body });
				// const response = await developJoinApi({ body }); // 개발용
				if (response && response.status === 200) {
					console.log(response);
					const { headers } = response;
					if (headers instanceof AxiosHeaders) {
						// TODOS: 토큰 저장
						const token = headers.get('authorization');
						console.log(token);
						alert('회원가입 OR 로그인 성공');
						localStorage.setItem('accessToken', `${token}`);
						router.push('/');
					}
				}
			} else {
				alert('값을 입력해주세요.');
				console.log('email', email);
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

	useEffect(() => {
		if (!email) {
			if (params.get('email')) {
				setEmail(params.get('email'));
			} else {
				alert('잘못된 접근입니다.');
				router.push('/');
			}
		}
	}, [email, params]);

	if (!email) {
		return <></>;
	}

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
