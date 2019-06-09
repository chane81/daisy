import React from 'react';
import styled, { css } from 'styled-components';

/**
 * 설명:						로딩 스피너 컴포넌트
 * className:				css class 명
 * isBgShow: 				로딩 백그라운드 레이어 표시할 것인가 true/false
 */
interface IProps {
	className?: string;
	isBgShow?: boolean;
}

const LoadingWrapper = styled('div')<IProps>`
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

const Loading: React.FC<IProps> = (props: IProps) => {
	return (
		<LoadingWrapper {...props}>
			<i className='fas fa-circle-notch fa-spin fa-4x' />
		</LoadingWrapper>
	);
};

export default Loading;
