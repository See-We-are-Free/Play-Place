'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import NOT_ARROWED_PATH from '@/constants/tabbarPath';

/**
 * 허용되지 않은 경로에 대해 Tabbar의 표시 유무를 확인하는 커스텀 훅.
 * @returns true (Tabbar 보여짐) / false (Tabbar 숨김)
 */
function useTabbarRender() {
	const [isTabbarRender, setIsTabbarRender] = useState(false);
	const location = usePathname();

	useEffect(() => {
		const isPathExcluded = NOT_ARROWED_PATH.some((path) => {
			if (typeof path === 'string') {
				return path === location;
			}
			if (path instanceof RegExp) {
				return path.test(location);
			}
			return false;
		});

		setIsTabbarRender(!isPathExcluded);
	}, [location]);

	return isTabbarRender;
}

export default useTabbarRender;
