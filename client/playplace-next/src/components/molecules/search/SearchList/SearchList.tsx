import { Song } from '@/types/songs';
import React from 'react';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import SearchListContainer from './style';
import SearchItems from '../SearchItems/SearchItems';

interface ISearchListProps {
	searchList: Song[];
}
function SearchList(props: ISearchListProps) {
	const { searchList } = props;
	return (
		<SearchListContainer>
			{searchList.map((item) => (
				<ContentLayout key={item.youtubeId}>
					<SearchItems searchItem={item} />
				</ContentLayout>
			))}
		</SearchListContainer>
	);
}

export default SearchList;
