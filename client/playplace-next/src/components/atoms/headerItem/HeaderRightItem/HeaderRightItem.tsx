'use client';

import { ReactNode } from 'react';
import { HeaderRightItemContainer } from './style';

interface HeaderLeftItemProps {
	children?: ReactNode | null;
}

function HeaderRightItem(props: HeaderLeftItemProps) {
	const { children } = props;

	if (children) {
		return <HeaderRightItemContainer>{children}</HeaderRightItemContainer>;
	}

	return <></>;
}

export default HeaderRightItem;
