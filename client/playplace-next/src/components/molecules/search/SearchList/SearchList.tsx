import { SearchSongItems } from '@/types/songs';
import React from 'react';
import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import SearchListContainer from './style';
import SearchItems from '../SearchItems/SearchItems';

interface ISearchListProps {
	searchList: SearchSongItems[];
}
function SearchList(props: ISearchListProps) {
	const { searchList } = props;
	return (
		<SearchListContainer>
			{searchList.map((item) => (
				<ContentLayout key={item.videoId} $margin="10px 0px">
					<SearchItems searchItems={item} />
				</ContentLayout>
			))}
		</SearchListContainer>
	);
}

export default SearchList;
