'use client';

import RightArrow from '@root/public/assets/icons/RightArrow.svg';
import { ButtonStyles } from '@/types/styles.d';
import Button from '@/components/atoms/Button/Button';

function JoinAgreement() {
	return (
		<>
			<ul>
				<li>
					<label htmlFor="all_agr">
						<input
							type="checkbox"
							name="all_agr"
							id="all_agr"
							// onChange={handleCheckOption}
							// checked={agreeData.all_agr}
						/>
						<span>약관 전체 동의</span>
					</label>
				</li>

				<li>
					<label htmlFor="agr1_use">
						<input
							type="checkbox"
							name="agr1_use"
							id="agr1_use"
							// onChange={handleCheckOption}
							// checked={agreeData.agr1_use}
						/>
						<span>이용약관 동의(필수)</span>
						<div>
							<RightArrow />
						</div>
					</label>
				</li>

				<li>
					<label htmlFor="agr2_info">
						<input
							type="checkbox"
							name="agr2_info"
							id="agr2_info"
							// onChange={handleCheckOption}
							// checked={agreeData.agr2_info}
						/>
						<span>개인정보 수집 및 이용(필수)</span>
						<div>
							<RightArrow />
						</div>
					</label>
				</li>
			</ul>
			<Button buttonType={ButtonStyles.outlinePrimary} content="다음" socialImg={false} />
		</>
	);
}

export default JoinAgreement;
