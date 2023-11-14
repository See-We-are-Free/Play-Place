'use client';

import RightArrow from '@root/public/assets/icons/RightArrow.svg';
import { ButtonStyles, ToastStyles } from '@/types/styles.d';
import Button from '@/components/atoms/Button/Button';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import AgreementDetail from '@/components/molecules/AgreementDetail/AgreementDetail';
import CustomToast from '@/components/atoms/CustomToast/CustomToast';
import { AGREEMENT_DETAIL } from '@/constants/member';
import { AgreementListItem, JoinAgreementContainer, Line } from './style';

interface JoinAgreementProps {
	handleNextStep: Dispatch<SetStateAction<number>>;
}

function JoinAgreement(props: JoinAgreementProps) {
	const { handleNextStep } = props;
	const [agreements, setAgreements] = useState<boolean[]>([false, false, false, false]);
	const [openDetail, setOpenDetail] = useState<number | null>(null);

	const handleNext = () => {
		if (agreements.filter((v) => v === false).length !== 0) {
			CustomToast(ToastStyles.error, '동의가 필요합니다.');
			return;
		}

		handleNextStep(1);
	};

	const handleCheckOption = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
		const checked = [...agreements];
		checked[idx] = e.target.checked;

		if (idx === 0 && checked[0]) {
			checked[1] = true;
			checked[2] = true;
			checked[3] = true;
		} else if (idx === 0) {
			checked[1] = false;
			checked[2] = false;
			checked[3] = false;
		} else if (!checked[idx]) {
			checked[0] = false;
		} else if (checked[idx]) {
			if (checked[1] && checked[2] && checked[3]) {
				checked[0] = true;
			}
		}

		setAgreements(checked);
	};

	const handleOpenDetail = (idx: number) => {
		setOpenDetail(idx);
	};

	if (openDetail === 0 || openDetail === 1 || openDetail === 2) {
		return <AgreementDetail idx={openDetail} handleOpenDeatil={setOpenDetail} />;
	}

	return (
		<JoinAgreementContainer>
			<ul>
				<AgreementListItem>
					<label htmlFor="all_agr">
						<input
							type="checkbox"
							name="all_agr"
							id="all_agr"
							onChange={(e) => handleCheckOption(e, 0)}
							checked={agreements[0]}
						/>
						<span>약관 전체 동의</span>
					</label>
				</AgreementListItem>

				<AgreementListItem>
					<Line />
				</AgreementListItem>

				<AgreementListItem>
					<label htmlFor="agr1_use">
						<input
							type="checkbox"
							name="agr1_use"
							id="agr1_use"
							onChange={(e) => handleCheckOption(e, 1)}
							checked={agreements[1]}
						/>
						<span>{AGREEMENT_DETAIL[0].title}</span>
					</label>
					<button type="button" onClick={() => handleOpenDetail(0)}>
						<RightArrow />
					</button>
				</AgreementListItem>

				<AgreementListItem>
					<label htmlFor="agr2_info">
						<input
							type="checkbox"
							name="agr2_info"
							id="agr2_info"
							onChange={(e) => handleCheckOption(e, 2)}
							checked={agreements[2]}
						/>
						<span>{AGREEMENT_DETAIL[1].title}</span>
					</label>
					<button type="button" onClick={() => handleOpenDetail(1)}>
						<RightArrow />
					</button>
				</AgreementListItem>

				<AgreementListItem>
					<label htmlFor="agr3_location">
						<input
							type="checkbox"
							name="agr3_location"
							id="agr3_location"
							onChange={(e) => handleCheckOption(e, 3)}
							checked={agreements[3]}
						/>
						<span>{AGREEMENT_DETAIL[2].title}</span>
					</label>
					<button type="button" onClick={() => handleOpenDetail(2)}>
						<RightArrow />
					</button>
				</AgreementListItem>
			</ul>
			<Button buttonType={ButtonStyles.outlinePrimaryBottom} content="다음" socialImg={false} onClick={handleNext} />
		</JoinAgreementContainer>
	);
}

export default JoinAgreement;
