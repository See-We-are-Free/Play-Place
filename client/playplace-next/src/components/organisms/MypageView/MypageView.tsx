import { Dispatch, SetStateAction, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import userInfoState from '@/recoil/user';
import Image from 'next/image';
import { PROFILE_IMAGES } from '@/constants/member';
import RightArrow from '@root/public/assets/icons/RightArrow.svg';
import ChatIcon from '@root/public/assets/icons/Chat.svg';
import HeartIcon from '@root/public/assets/icons/HeartOnCustomColor.svg';
import SettingIcon from '@root/public/assets/icons/Setting.svg';
import chatbotModalState from '@/recoil/chatbot';
import { useRouter } from 'next/navigation';
import {
	BackgroundShadow,
	ConentContaner,
	Greeting,
	MypageBody,
	MypageFooter,
	MypageHeader,
	MypageViewOverflow,
	MypageViewWrapper,
	Profile,
} from './style';

interface MypageViewProps {
	$isMyMenuOpen: boolean;
	setIsMyMenuOpen: Dispatch<SetStateAction<boolean>>;
}

function MypageView(props: MypageViewProps) {
	const { $isMyMenuOpen, setIsMyMenuOpen } = props;
	const [user] = useRecoilState(userInfoState);
	const [, setChatbotModal] = useRecoilState(chatbotModalState);

	const router = useRouter();

	const handleMenu = (menu: string) => {
		if (menu === 'profile') {
			router.push('/info');
		} else if (menu === 'like') {
			router.push('/like');
		} else if (menu === 'setting') {
			router.push('/setting');
		} else if (menu === 'chatbot') {
			setChatbotModal(true);
			setIsMyMenuOpen(false);
		}
	};

	useEffect(() => {
		if ($isMyMenuOpen) {
			document.body.classList.add('no-scroll');
		} else {
			document.body.classList.remove('no-scroll');
		}

		return () => {
			document.body.classList.remove('no-scroll');
		};
	}, [$isMyMenuOpen]);

	return (
		<MypageViewOverflow $isMyMenuOpen={$isMyMenuOpen}>
			<MypageViewWrapper $isMyMenuOpen={$isMyMenuOpen} className={$isMyMenuOpen ? 'open' : 'close'}>
				<ConentContaner>
					<MypageHeader>
						<Greeting>
							<div>{`'${user.nickname}' 님, 환영합니다.`}</div>
							<div>오늘도 좋은 하루 되세요.</div>
						</Greeting>
						<Profile type="button" onClick={() => handleMenu('profile')}>
							{user && (
								<>
									<Image src={PROFILE_IMAGES[user.profileImg]} alt={`${user.nickname} 님의 프로필 이미지`} />
									<div>{user.nickname}</div>
									<RightArrow />
								</>
							)}
						</Profile>
					</MypageHeader>
					<MypageBody>
						<ul>
							<li>
								<button type="button" onClick={() => handleMenu('chatbot')}>
									<ChatIcon />
									<div>플로디</div>
								</button>
							</li>
							<li>
								<button type="button" onClick={() => handleMenu('like')}>
									<HeartIcon />
									<div>좋아요</div>
								</button>
							</li>
							<li>
								<button type="button" onClick={() => handleMenu('setting')}>
									<SettingIcon />
									<div>설정</div>
								</button>
							</li>
						</ul>
					</MypageBody>
					<MypageFooter>Copyright ⓒ Play, Place</MypageFooter>
				</ConentContaner>
			</MypageViewWrapper>
			<BackgroundShadow
				role="button"
				aria-label="메뉴 닫기"
				className={$isMyMenuOpen ? 'open' : 'close'}
				onClick={() => setIsMyMenuOpen(false)}
				onKeyDown={() => {}}
				tabIndex={0}
			/>
		</MypageViewOverflow>
	);
}

export default MypageView;
