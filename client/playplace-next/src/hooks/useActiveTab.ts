import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const useActiveTab = (path: string) => {
	const pathname = usePathname();
	const [active, setActive] = useState(false);

	useEffect(() => {
		if (path === '/') {
			if (path === pathname) setActive(true);
			else setActive(false);
		} else if (pathname.includes(path)) {
			setActive(true);
		} else {
			setActive(false);
		}
	}, [pathname, path]);

	return active;
};

export default useActiveTab;
