'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import useActiveTab from '@/hooks/useActiveTab';
import TabbarItemWrapper from './style';

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
		console.log(title);
		router.push(path);
	};

	return (
		<TabbarItemWrapper onClick={handleClick} $isActive={isActive}>
			{icon}
			<span>{title}</span>
		</TabbarItemWrapper>
	);
}

export default TabbarItem;
