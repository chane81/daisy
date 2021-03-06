import React from 'react';
import styled from 'styled-components';

/**
 * 설명:						푸터 컴포넌트
 * className:				css class 명
 */
interface IProps {
	className?: string;
}

const FooterWrapper = styled('div')`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 65px;
`;

const Footer: React.FC<IProps> = props => (
	<FooterWrapper {...props}>
		<div>푸터</div>
	</FooterWrapper>
);

export default Footer;
