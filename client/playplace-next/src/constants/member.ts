import ProfileImg1 from '@root/public/assets/images/profileImages/profileImg1.png';
import ProfileImg2 from '@root/public/assets/images/profileImages/profileImg2.png';
import ProfileImg3 from '@root/public/assets/images/profileImages/profileImg3.png';
import ProfileImg4 from '@root/public/assets/images/profileImages/profileImg4.png';
import ProfileImg5 from '@root/public/assets/images/profileImages/profileImg5.png';
import ProfileImg6 from '@root/public/assets/images/profileImages/profileImg6.png';
import { StaticImageData } from 'next/image';

interface ProfileImagesType {
	[key: number]: StaticImageData;
}

export const PROFILE_IMAGES: ProfileImagesType = {
	0: ProfileImg1,
	1: ProfileImg2,
	2: ProfileImg3,
	3: ProfileImg4,
	4: ProfileImg5,
	5: ProfileImg6,
};

export const AGREEMENT_DETAIL = [
	{
		title: '이용약관 동의(필수)',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nVestibulum vitae tincidunt nisl, quis eleifend justo.\nVivamus vel ligula id est ultrices consectetur.\nNam ut nisl nec nunc dictum tincidunt.\nNulla facilisi.\nSuspendisse potenti.\nMorbi in felis non sapien vestibulum aliquam.\nNunc vestibulum nisl vel odio dignissim efficitur.\nInteger eu ex id metus accumsan iaculis.\nVivamus nec bibendum nisi.\nEtiam fermentum, odio nec aliquam iaculis, eros nulla bibendum odio, ut efficitur quam eros a justo.\nIn hac habitasse platea dictumst.\nInteger eu lacinia mauris.\nInteger id vestibulum lacus.\nVivamus id bibendum urna.\nCras vel nunc quis nisl condimentum scelerisque.\nPellentesque at mauris eget metus ultrices tincidunt.\nProin commodo, mauris eget vulputate ullamcorper, mi metus posuere arcu, vel congue odio justo vitae sapien.\nInteger ut metus ac nulla lacinia congue.\nInteger auctor elit a nunc fermentum, vel efficitur ligula eleifend.\nIn sed nisi a quam venenatis ullamcorper vel in ligula.\nCurabitur ut ante eu elit laoreet viverra.\nNulla tristique, erat et fringilla eleifend, sem quam viverra felis, nec malesuada dui metus ac odio.\nMaecenas non velit sit amet turpis ullamcorper dapibus.\nDuis commodo, purus ac tincidunt ullamcorper, felis lacus hendrerit dolor, ac tincidunt lacus felis quis tellus.\nVivamus nec augue vestibulum, luctus neque id, ultrices nulla.\nAliquam nec purus sit amet sem euismod volutpat.\nEtiam in orci et dui auctor euismod eu a dui.\nInteger in turpis sit amet odio fermentum tincidunt.\nDuis vel cursus libero.\nEtiam feugiat odio vitae ligula fringilla, nec facilisis elit semper.\nSed auctor, lacus vel tristique venenatis, odio nunc ultrices libero, nec dictum justo sapien a ante.\nQuisque gravida urna vel tortor tristique, in dictum ligula ullamcorper.\nUt nec varius quam.\nSed eu diam a elit pellentesque feugiat.\nInteger vel aliquet lacus.\nUt sed euismod libero.\nSed euismod volutpat sem eu sodales.\nCurabitur et enim non justo varius efficitur.\nProin a sapien sed',
	},
	{
		title: '이용약관 동의(필수)',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nVestibulum vitae tincidunt nisl, quis eleifend justo.\nVivamus vel ligula id est ultrices consectetur.\nNam ut nisl nec nunc dictum tincidunt.\nNulla facilisi.\nSuspendisse potenti.\nMorbi in felis non sapien vestibulum aliquam.\nNunc vestibulum nisl vel odio dignissim efficitur.\nInteger eu ex id metus accumsan iaculis.\nVivamus nec bibendum nisi.\nEtiam fermentum, odio nec aliquam iaculis, eros nulla bibendum odio, ut efficitur quam eros a justo.\nIn hac habitasse platea dictumst.\nInteger eu lacinia mauris.\nInteger id vestibulum lacus.\nVivamus id bibendum urna.\nCras vel nunc quis nisl condimentum scelerisque.\nPellentesque at mauris eget metus ultrices tincidunt.\nProin commodo, mauris eget vulputate ullamcorper, mi metus posuere arcu, vel congue odio justo vitae sapien.\nInteger ut metus ac nulla lacinia congue.\nInteger auctor elit a nunc fermentum, vel efficitur ligula eleifend.\nIn sed nisi a quam venenatis ullamcorper vel in ligula.\nCurabitur ut ante eu elit laoreet viverra.\nNulla tristique, erat et fringilla eleifend, sem quam viverra felis, nec malesuada dui metus ac odio.\nMaecenas non velit sit amet turpis ullamcorper dapibus.\nDuis commodo, purus ac tincidunt ullamcorper, felis lacus hendrerit dolor, ac tincidunt lacus felis quis tellus.\nVivamus nec augue vestibulum, luctus neque id, ultrices nulla.\nAliquam nec purus sit amet sem euismod volutpat.\nEtiam in orci et dui auctor euismod eu a dui.\nInteger in turpis sit amet odio fermentum tincidunt.\nDuis vel cursus libero.\nEtiam feugiat odio vitae ligula fringilla, nec facilisis elit semper.\nSed auctor, lacus vel tristique venenatis, odio nunc ultrices libero, nec dictum justo sapien a ante.\nQuisque gravida urna vel tortor tristique, in dictum ligula ullamcorper.\nUt nec varius quam.\nSed eu diam a elit pellentesque feugiat.\nInteger vel aliquet lacus.\nUt sed euismod libero.\nSed euismod volutpat sem eu sodales.\nCurabitur et enim non justo varius efficitur.\nProin a sapien sed',
	},
];
