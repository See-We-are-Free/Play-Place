import ContentLayout from '@/components/templates/layout/ContentLayout/ContentLayout';
import { AGREEMENT_DETAIL } from '@/constants/member';
import { Dispatch, SetStateAction } from 'react';
import CloseIcon from '@root/public/assets/icons/Close.svg';
import { AgreementDetailContainer, Content, Title, TitleCotainer } from './style';

interface AgreementDetailProps {
	idx: number;
	handleOpenDeatil: Dispatch<SetStateAction<number | null>>;
}

function AgreementDetail(props: AgreementDetailProps) {
	const { idx, handleOpenDeatil } = props;

	return (
		<ContentLayout>
			<AgreementDetailContainer>
				<TitleCotainer>
					<Title>{AGREEMENT_DETAIL[idx].title}</Title>
					<button type="button" onClick={() => handleOpenDeatil(null)}>
						<CloseIcon />
					</button>
				</TitleCotainer>
				<Content>
					<pre>{AGREEMENT_DETAIL[idx].content}</pre>
				</Content>
			</AgreementDetailContainer>
		</ContentLayout>
	);
}

export default AgreementDetail;
