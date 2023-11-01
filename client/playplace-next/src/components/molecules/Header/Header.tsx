'use client';

import { HeaderStyles } from '@/types/styles.d';
import HeaderLeftItem from '@/components/atoms/headerItem/HeaderLeftItem/HeaderLeftItem';
import HeaderRightItem from '@/components/atoms/headerItem/HeaderRightItem/HeaderRightItem';
import { ReactNode } from 'react';
import { HeaderContainer, HeaderLeftItemWrapper, HeaderRightItemWrapper, HeaderWrapper } from './style';

interface HeaderProps {
	$headerType: HeaderStyles;
	location?: string | null;
	pageName?: string | null;
	children?: ReactNode | null;
}

/**
 * 헤더
 * @param $headerType HeaderStyles, 헤더 종류 지정
 * @param location? string | null, 메인 페이지 위치
 * @param pageName? string | null, 페이지명 지정
 * @param children? ReactNode | null, 오른쪽 컨텐츠
 */
function Header(props: HeaderProps) {
	const { $headerType = HeaderStyles.home, location = null, pageName = null, children = null } = props;
	return (
		<HeaderWrapper>
			<HeaderContainer>
				<HeaderLeftItemWrapper>
					<HeaderLeftItem $headerType={$headerType} location={location} pageName={pageName} />
				</HeaderLeftItemWrapper>
				<HeaderRightItemWrapper>
					<HeaderRightItem>{children}</HeaderRightItem>
				</HeaderRightItemWrapper>
			</HeaderContainer>
		</HeaderWrapper>
	);
}

export default Header;
