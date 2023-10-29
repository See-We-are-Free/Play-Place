'use client';

import { PropsWithChildren } from 'react';
import { RecoilRoot } from 'recoil';
import GlobalStyles from '../styles/GlobalStyles';

function Providers({ children }: PropsWithChildren) {
	return (
		<>
			<RecoilRoot>
				<GlobalStyles />
				{children}
			</RecoilRoot>
		</>
	);
}

export default Providers;
