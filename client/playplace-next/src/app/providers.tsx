'use client';

import { PropsWithChildren } from 'react';
import { GlobalStyles } from './../styles/GlobalStyles';

export function Providers({ children }: PropsWithChildren) {
	return (
		<>
			<GlobalStyles />
			{children}
		</>
	);
}
