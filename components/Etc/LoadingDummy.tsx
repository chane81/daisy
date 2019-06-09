import React from 'react';
import styled, { css } from 'styled-components';

/**
 * 설명:						로딩 스피너 컴포넌트, 스타일드 컴포넌트의 다른 사용방법 예시임
 * className:				css class 명
 * isBgShow: 				로딩 백그라운드 레이어 표시할 것인가 true/false
 */
interface IProps {
	className?: string;
	isBgShow?: boolean;
}

const Loading: React.FC<IProps> = props => {
	console.log(props.isBgShow);

	return (
		<div className={props.className}>
			<i className='fas fa-circle-notch fa-spin fa-4x' />
		</div>
	);
};

const LoadingWrapper = styled(Loading)`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	color: #3b5bdb;
	opacity: 0.9;
	z-index: 999 !important;

	${(props: IProps) =>
		(props.isBgShow === undefined || props.isBgShow) &&
		css`
			background: rgba(100, 100, 100, 0.5);
		`};
`;

export default LoadingWrapper;
