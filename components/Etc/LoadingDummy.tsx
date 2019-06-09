import React from 'react';
import styled, { css } from 'styled-components';

interface IProps {
	isBgShow?: boolean;
	className?: string;
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
