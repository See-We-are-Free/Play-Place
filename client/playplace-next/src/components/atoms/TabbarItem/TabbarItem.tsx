'use client';

import { ReactNode, useState } from 'react';
import { TabbarItemWrapper } from './style';
import { useRouter } from 'next/navigation';
import useActiveTab from '@/hooks/useActiveTab';

interface ITabbarItemProps {
	icon: ReactNode;
	title: string;
	path: string;
}

function TabbarItem(props: ITabbarItemProps) {
	const { icon, title, path } = props;
	const isActive = useActiveTab(path);
	const router = useRouter();

	const handleClick = () => {
		router.push(path);
	};

	return (
		<TabbarItemWrapper onClick={handleClick} $isActive={isActive}>
			<>{icon}</>
			<span>{title}</span>
		</TabbarItemWrapper>
	);
}

export default TabbarItem;
