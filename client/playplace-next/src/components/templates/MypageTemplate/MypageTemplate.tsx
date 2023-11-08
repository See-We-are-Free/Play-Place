import { Dispatch, SetStateAction, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import userInfoState from '@/recoil/user';
import { BackgroundShadow, ConentContaner, MypageHeader, MypageTemplateOverflow, MypageTemplateWrapper } from './style';

interface MypageTemplateProps {
	$isMyMenuOpen: boolean;
	setIsMyMenuOpen: Dispatch<SetStateAction<boolean>>;
}

function MypageTemplate(props: MypageTemplateProps) {
	const { $isMyMenuOpen, setIsMyMenuOpen } = props;
	const [user] = useRecoilState(userInfoState);

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
		<MypageTemplateOverflow $isMyMenuOpen={$isMyMenuOpen}>
			<MypageTemplateWrapper $isMyMenuOpen={$isMyMenuOpen} className={$isMyMenuOpen ? 'open' : 'close'}>
				<ConentContaner>
					<MypageHeader>
						<div>{`'${user && user.nickname}' 님, 환영합니다.`}</div>
						<div>오늘도 좋은 하루 되세요.</div>
					</MypageHeader>
					<div>그래</div>
					<div>맞다</div>
					<button type="button" onClick={() => setIsMyMenuOpen(false)}>
						닫기
					</button>
				</ConentContaner>
			</MypageTemplateWrapper>
			<BackgroundShadow
				role="button"
				aria-label="메뉴 닫기"
				className={$isMyMenuOpen ? 'open' : 'close'}
				onClick={() => setIsMyMenuOpen(false)}
				onKeyDown={() => {}}
				tabIndex={0}
			/>
		</MypageTemplateOverflow>
	);
}

export default MypageTemplate;
