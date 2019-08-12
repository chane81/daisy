import React, { useState } from 'react';
import styled from 'styled-components';

/**
 * 설명:						푸터 컴포넌트
 * className:				css class 명
 */
interface IProps {
	className?: string;
	children?: React.ReactNode;
	handleCloseClick: () => void;
	visible: boolean;
}

const LayerWrapper = styled('div')<IProps>`
	position: absolute;
	left: 0;
	top: 0;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	color: #3b5bdb;
	opacity: 1;
	z-index: 999 !important;
	background: rgba(100, 100, 100, 0.5);

	display: ${(props: IProps) => (props.visible ? 'flex' : 'none')};

	.child-area {
		width: 80%;
	}
`;

const Layer: React.FC<IProps> = props => {
	return (
		<LayerWrapper {...props} onClick={props.handleCloseClick}>
			<div className='child-area'>{props.children}</div>
		</LayerWrapper>
	);
};

export default Layer;
