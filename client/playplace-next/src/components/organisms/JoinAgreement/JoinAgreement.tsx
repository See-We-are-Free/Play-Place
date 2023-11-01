'use client';

import RightArrow from '@root/public/assets/icons/RightArrow.svg';
import { ButtonStyles } from '@/types/styles.d';
import Button from '@/components/atoms/Button/Button';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import AgreementDetail from '@/components/molecules/AgreementDetail/AgreementDetail';
import { AgreementListItem, JoinAgreementContainer, Line } from './style';

interface JoinAgreementProps {
	handleNextStep: Dispatch<SetStateAction<number>>;
}

function JoinAgreement(props: JoinAgreementProps) {
	const { handleNextStep } = props;
	const [agreements, setAgreements] = useState<boolean[]>([false, false, false]);
	const [openDetail, setOpenDetail] = useState<number | null>(null);

	const handleNext = () => {
		if (agreements.filter((v) => v === false).length !== 0) {
			alert('동의가 필요합니다.');
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
		} else if (idx === 0) {
			checked[1] = false;
			checked[2] = false;
		} else if (!checked[idx]) {
			checked[0] = false;
		} else if (checked[idx]) {
			if (checked[1] && checked[2]) {
				checked[0] = true;
			}
		}

		setAgreements(checked);
	};

	const handleOpenDetail = (idx: number) => {
		setOpenDetail(idx);
	};

	useEffect(() => {
		console.log('agreements', agreements);
	}, [agreements]);

	if (openDetail === 0 || openDetail === 1) {
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
						<span>이용약관 동의(필수)</span>
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
						<span>개인정보 수집 및 이용(필수)</span>
					</label>
					<button type="button" onClick={() => handleOpenDetail(1)}>
						<RightArrow />
					</button>
				</AgreementListItem>
			</ul>
			<Button buttonType={ButtonStyles.outlinePrimaryBottom} content="다음" socialImg={false} onClick={handleNext} />
		</JoinAgreementContainer>
	);
}

export default JoinAgreement;
