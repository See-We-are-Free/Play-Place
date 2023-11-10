import React, { useContext, useEffect, useState } from 'react';
import EmojiList from '@/components/molecules/EmojiList/EmojiList';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import Text from '@/components/atoms/Text/Text';
import Button from '@/components/atoms/Button/Button';
import { ButtonStyles, ToastStyles } from '@/types/styles.d';
import { patchUserApi } from '@/utils/api/auth';
import CustomToast from '@/components/atoms/CustomToast/CustomToast';
import { useRouter } from 'next/navigation';
import UserInfoContext from '@/utils/common/UserInfoContext';
import NicknameContainer from '../../JoinInfo/style';

function MypageModify() {
	const { user } = useContext(UserInfoContext);
	const router = useRouter();
	const [profileImg, setProfileImg] = useState<number>(0);
	const [nickname, setNickname] = useState<string>('');

	const handleSelectEmoji = (idx: number) => {
		setProfileImg(idx);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNickname(event.target.value);
	};

	const ModifyUserInfo = async () => {
		if (user.nickname !== nickname || user.profileImg !== profileImg) {
			try {
				const response = await patchUserApi({
					body: {
						numImg: profileImg,
						nickname,
					},
				});

				if (response.status === 200) {
					console.log(response);
					CustomToast(ToastStyles.success, `${nickname} 으로 수정됬습니다`);
					router.push('/');
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			CustomToast(ToastStyles.error, '수정 변동 사항이 없습니다!');
		}
	};

	useEffect(() => {
		setProfileImg(user.profileImg);
		setNickname(user.nickname);
	}, [user]);

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
			<Button
				buttonType={ButtonStyles.outlinePrimaryBottom}
				content="수정하기"
				socialImg={false}
				onClick={ModifyUserInfo}
			/>
		</>
	);
}

export default MypageModify;
