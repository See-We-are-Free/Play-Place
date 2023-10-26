'use client';

import { useState } from 'react';

const useToggle = (initial: boolean = false) => {
	const [isActive, setIsActive] = useState(initial);

	const toggle = () => {
		setIsActive(!isActive);
	};

	return [isActive, toggle];
};

export default useToggle;
