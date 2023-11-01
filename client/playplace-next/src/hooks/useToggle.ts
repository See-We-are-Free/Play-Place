'use client';

import { useState } from 'react';

const useToggle = (initial: boolean = false): [boolean, () => void] => {
	const [isActive, setIsActive] = useState(initial);

	const toggle = () => {
		setIsActive(!isActive);
	};

	return [isActive, toggle];
};

export default useToggle;
