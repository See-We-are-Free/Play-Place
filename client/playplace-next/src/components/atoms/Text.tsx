import { theme } from '@/themes';
import { Responsive } from '@/types/styles';
import { Color, FontSize, Space, toPropValue } from '@/utils/common/styles';
import styled from 'styled-components';

export type TextProps = {
	$fontSize?: Responsive<FontSize>;
	$fontWeight?: Responsive<string>;
	$color?: Responsive<Color>;
	$margin?: Responsive<Space>;
	$marginTop?: Responsive<Space>;
	$marginRight?: Responsive<Space>;
	$marginBottom?: Responsive<Space>;
	$marginLeft?: Responsive<Space>;
	$padding?: Responsive<Space>;
	$paddingTop?: Responsive<Space>;
	$paddingRight?: Responsive<Space>;
	$paddingBottom?: Responsive<Space>;
	$paddingLeft?: Responsive<Space>;
};

/**
 * 텍스트
 * 변형, 색상, 타이포그래피, 레이아웃, 스페이스 관련 Props 추가
 */
const Text = styled.span<TextProps>`
	${(props) => toPropValue('font-size', props.$fontSize, theme)}
	${(props) => toPropValue('font-weight', props.$fontWeight, theme)}
	${(props) => toPropValue('color', props.$color, theme)}
  ${(props) => toPropValue('margin', props.$margin, theme)}
  ${(props) => toPropValue('margin-top', props.$marginTop, theme)}
  ${(props) => toPropValue('margin-left', props.$marginLeft, theme)}
  ${(props) => toPropValue('margin-bottom', props.$marginBottom, theme)}
  ${(props) => toPropValue('margin-right', props.$marginRight, theme)}
  ${(props) => toPropValue('padding', props.$padding, theme)}
  ${(props) => toPropValue('padding-top', props.$paddingTop, theme)}
  ${(props) => toPropValue('padding-left', props.$paddingLeft, theme)}
  ${(props) => toPropValue('padding-bottom', props.$paddingBottom, theme)}
  ${(props) => toPropValue('padding-right', props.$paddingRight, theme)}
`;

Text.defaultProps = {
	color: 'text',
};

export default Text;
