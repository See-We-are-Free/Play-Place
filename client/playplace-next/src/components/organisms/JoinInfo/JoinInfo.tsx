'use client';

import { JoinInfoType } from '@/types/auth';
import { joinApi } from '@/utils/api/auth';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/atoms/Button/Button';
import { ButtonStyles } from '@/types/styles.d';
import { PROFILE_IMAGES } from '@/constants/member';

import { AxiosHeaders } from 'axios';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';

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
				console.log('값을 입력해');
				console.log('email', email);
				console.log('nickname', nickname);
				console.log('profileImg', profileImg);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleProfileImg = (idx: number) => {
		setProfileImg(idx);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNickname(event.target.value);
	};

	useEffect(() => {
		if (!email) {
			console.log("params.get('email')", params.get('email'));
			if (params.get('email')) {
				setEmail(params.get('email'));
			} else {
				console.log('잘못된 접근');
				alert('잘못된 접근입니다.');
				router.push('/');
			}
		}
	}, [email, params]);

	useEffect(() => {
		console.log('nickname', nickname);
		console.log('profileImg', profileImg);
	}, [nickname, profileImg]);

	if (!email) {
		return <></>;
	}

	return (
		<>
			<ContentLayout>
				나를 표현할 이모지를 골라주세요!
				<ul>
					<li>
						<button type="button" onClick={() => handleProfileImg(0)}>
							<Image src={PROFILE_IMAGES[0]} alt="프로필 이미지 1" />
						</button>
					</li>

					<li>
						<button type="button" onClick={() => handleProfileImg(1)}>
							<Image src={PROFILE_IMAGES[1]} alt="프로필 이미지 1" />
						</button>
					</li>
					<li>
						<button type="button" onClick={() => handleProfileImg(2)}>
							<Image src={PROFILE_IMAGES[2]} alt="프로필 이미지 1" />
						</button>
					</li>
					<li>
						<button type="button" onClick={() => handleProfileImg(3)}>
							<Image src={PROFILE_IMAGES[3]} alt="프로필 이미지 1" />
						</button>
					</li>
				</ul>
			</ContentLayout>
			<ContentLayout>
				닉네임 <input type="text" onChange={handleInputChange} value={nickname || ''} />
			</ContentLayout>
			<Button buttonType={ButtonStyles.outlinePrimary} content="가입하기" socialImg={false} onClick={join} />
		</>
	);
}

export default JoinInfo;
