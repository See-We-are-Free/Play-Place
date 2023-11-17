import React, { ReactNode } from 'react';
import { ContentLayoutSizes } from '@/types/styles.d';
import ContentLayout from '../layout/ContentLayout/ContentLayout';
import SearchTemplateContainer from './style';

function SearchTemplate({ children }: { children: ReactNode[] }) {
	return (
		<SearchTemplateContainer>
			{/* SearchBar */}
			<ContentLayout size={ContentLayoutSizes.lg} $margin="10px 0px 20px 0px" $height="fit-content">
				{children[0]}
			</ContentLayout>
			{/* 검색 결과 */}
			<ContentLayout size={ContentLayoutSizes.sm}>{children[1]}</ContentLayout>
		</SearchTemplateContainer>
	);
}

export default SearchTemplate;
