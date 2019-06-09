import React from 'react';
import styled from 'styled-components';
import LeftMenuBtn from '../Button/LeftMenuBtn';
import Navbar from '../Button/Navbar';

/**
 * 설명:						레프트메뉴 컴포넌트
 * className:				css class 명
 */
interface IProps {
	className?: string;
}

const LeftMenuWrapper = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	border-right: 1px solid #868e96;
	border-bottom: 1px solid #868e96;
	width: 200px;
`;

const LeftMenu: React.FC<IProps> = props => (
	<LeftMenuWrapper {...props}>
		<Navbar btnTextName='DAISY' btnKind='X' />
		<LeftMenuBtn
			iconClassName='fas fa-fire fa-lg'
			btnTextName='Popular Albums'
			depth={1}
		/>
		<LeftMenuBtn iconClassName='fas fa-star fa-lg' btnTextName='Top 100' />
		<LeftMenuBtn iconClassName='fas fa-user fa-lg' btnTextName='홍길동' />
		<LeftMenuBtn
			iconClassName='fas fa-compact-disc fa-lg'
			btnTextName='Album'
		/>
		<LeftMenuBtn iconClassName='fas fa-microphone fa-lg' btnTextName='Artist' />
		<LeftMenuBtn iconClassName='fas fa-music fa-lg' btnTextName='Playlist' />
		<LeftMenuBtn
			iconClassName='fas fa-chevron-right'
			btnTextName='발라드'
			depth={3}
		/>
		<LeftMenuBtn
			iconClassName='fas fa-chevron-right'
			btnTextName='R&B'
			depth={3}
		/>
		<LeftMenuBtn
			iconClassName='fas fa-chevron-right'
			btnTextName='락'
			depth={3}
		/>
	</LeftMenuWrapper>
);

export default LeftMenu;
