import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import LeftMenuBtn from '../Button/LeftMenuBtn';
import Navbar from '../Button/Navbar';

/**
 * 설명:                        레프트메뉴 컴포넌트
 * className:                css class 명
 * visible:                    레프트메뉴 비져블 true/false
 * handleNavClick:    nav바 클릭 이벤트 핸들러
 */
interface IProps {
	className?: string;
	visible?: boolean;
	handleNavClick?: () => void;
}

const LeftMenuWrapper = styled('div')<IProps>`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	box-sizing: border-box;
	border-right: 1px solid #e7ebf3;
	border-bottom: 1px solid #e7ebf3;
	min-height: 50px;
	overflow-y: auto;
	overflow-x: hidden;
	transition: min-width 0.3s, max-width 0.3s ease-in-out;
	min-width: ${(props: IProps) => (props.visible ? '11.4rem' : '0')};
	max-width: ${(props: IProps) => (props.visible ? '11.4rem' : '0')};
`;

const LeftMenu: React.FC<IProps> = props => {
	return (
		<LeftMenuWrapper {...props} visible={props.visible}>
			<Navbar
				btnTextName='DAISY'
				className='left-navbar'
				btnKind='X'
				visible={true}
				handleNavClick={props.handleNavClick}
			/>
			<LeftMenuBtn
				iconClassName='fas fa-fire fa-lg'
				btnTextName='Popular Tracks'
				linkUrl='/popular-tracks'
			/>
			<LeftMenuBtn
				iconClassName='fas fa-star fa-lg'
				btnTextName='Channel List'
				linkUrl='/channel-list'
			/>
			<LeftMenuBtn
				iconClassName='fas fa-user fa-lg'
				btnTextName='홍길동'
			/>
			<LeftMenuBtn
				iconClassName='fas fa-compact-disc fa-lg'
				btnTextName='Album'
			/>
			<LeftMenuBtn
				iconClassName='fas fa-microphone fa-lg'
				btnTextName='Artist'
			/>
			<LeftMenuBtn
				iconClassName='fas fa-music fa-lg'
				btnTextName='Playlist'
			/>
			<LeftMenuBtn
				iconClassName='fas fa-chevron-right'
				btnTextName='발라드'
				depth={2}
			/>
			<LeftMenuBtn
				iconClassName='fas fa-chevron-right'
				btnTextName='R&B'
				depth={2}
			/>
			<LeftMenuBtn
				iconClassName='fas fa-chevron-right'
				btnTextName='락'
				depth={2}
			/>
		</LeftMenuWrapper>
	);
};

export default LeftMenu;
