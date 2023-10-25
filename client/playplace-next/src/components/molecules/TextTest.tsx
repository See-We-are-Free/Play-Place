import Text from '../atoms/Text';

const TextTest = () => {
	return (
		<div>
			<Text $color="secondary" $fontWeight="normal" $padding={4}>
				텍스트1
			</Text>
			<Text $color="primary" $fontWeight="bold" $paddingRight={15}>
				텍스트2
			</Text>
			<Text $color="danger" $fontWeight="800" $paddingLeft={1}>
				텍스트3
			</Text>
		</div>
	);
};

export default TextTest;
