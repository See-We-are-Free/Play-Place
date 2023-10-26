'use client';

import TabbarItem from '@/components/atoms/TabbarItem/TabbarItem';
import MENUS from '@/constants/common';
import React from 'react';
import TabbarContainer from './style';

function Tabbar() {
	return (
		<TabbarContainer>
			{MENUS.map((menu) => (
				<TabbarItem key={menu.path} icon={menu.icon} title={menu.title} path={menu.path} />
			))}
		</TabbarContainer>
	);
}

export default Tabbar;
