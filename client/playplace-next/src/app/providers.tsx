'use client';

import { PropsWithChildren } from 'react';
import { RecoilRoot } from 'recoil';
import StompClientProvider from '@/components/atoms/StompClientProvider/StompClientProvider';
import GlobalStyles from '@/styles/GlobalStyles';
import UserInfoProvider from '../components/atoms/UserInfoProvider/UserInfoProvider';

function Providers({ children }: PropsWithChildren) {
	return (
		<>
			<RecoilRoot>
				<GlobalStyles />
				<UserInfoProvider>
					<StompClientProvider>{children}</StompClientProvider>
				</UserInfoProvider>
			</RecoilRoot>
		</>
	);
}

export default Providers;
