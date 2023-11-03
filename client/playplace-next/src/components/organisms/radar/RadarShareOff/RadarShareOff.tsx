import Text from '@/components/atoms/Text/Text';
import TextContainer from './style';

function RadarShareOff() {
	return (
		<TextContainer>
			<Text text="내 주변 음악을 보려면" fontSize={16} />
			<Text text="오른쪽 상단의 공유하기를 활성화 해주세요!" fontSize={16} />
		</TextContainer>
	);
}

export default RadarShareOff;
