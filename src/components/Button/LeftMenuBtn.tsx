import React from 'react';
import styled, { css } from 'styled-components';
import {
	Router,
	withRouter,
	SingletonRouter
} from '../../library/routerHelper';

/**
 * 설명:						레프트 메뉴 버튼 컴포넌트
 * className:				css class 명
 * iconClassName: 	fontawesome 의 아이콘 className(ex. fas fa-fire fa-lg)
 * btnTextName: 		버튼 표시 이름
 * depth:						뎁스증가에 따라서 오른쪽으로 컨텐츠가 이동함
 * linkUrl:					링크 url
 * isActive:				활성 상태인지 여부 true/false
 * router:					withRouter에 의해 주입된 prop
 */
interface IProps {
	className?: string;
	iconClassName?: string;
	btnTextName?: string;
	depth?: number;
	linkUrl?: string;
	isActive?: boolean;
	router?: SingletonRouter;
}

const LeftMenuBtnWrapper = styled('div')<IProps>`
	display: flex;
	flex-direction: row;
	justify-content: start;
	align-items: center;
	width: 11.4rem;
	line-height: 3.5rem;
	font-family: 'Noto Sans KR', sans-serif;
	transition: background-color 0.2s ease-in-out;
	cursor: pointer;

	/** 강제 활성화 했거나 또는 현재 라우트에 해당하는 버튼일 경우 활성화 함 */
	background-color: ${(props: IProps) =>
		(!!props.isActive || props.linkUrl! === props.router!.route) &&
		'#e9ecef;'};
	:hover {
		background-color: #e9ecef;
	}

	${(props: IProps) => {
		const space =
			props.depth === 2
				? '2rem'
				: props.depth === 3
				? '3rem'
				: props.depth === 4
				? '4rem'
				: '1rem';

		return css`
			.icon {
				width: 20%;
				margin: 0 0 0 ${space};
			}
		`;
	}}
`;
const LeftMenuBtn: React.FC<IProps> = props => {
	const handleClick = () => {
		Router.pushRoute(props.linkUrl!);
	};

	return (
		<LeftMenuBtnWrapper {...props} onClick={handleClick}>
			<div className='icon'>
				<i className={props.iconClassName} />
			</div>
			<div>{props.btnTextName}</div>
		</LeftMenuBtnWrapper>
	);
};

export default withRouter(LeftMenuBtn);
