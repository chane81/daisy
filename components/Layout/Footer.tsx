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
	height: 4rem;
	border-bottom: 1px solid #868e96;
`;

const Footer: React.FC<IProps> = props => (
	<FooterWrapper {...props}>푸터</FooterWrapper>
);

export default Footer;
