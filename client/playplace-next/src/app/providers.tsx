'use client';

import { PropsWithChildren } from 'react';
import GlobalStyles from '../styles/GlobalStyles';

function Providers({ children }: PropsWithChildren) {
	return (
		<>
			<GlobalStyles />
			{children}
		</>
	);
}

export default Providers;
