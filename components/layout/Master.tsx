import React from 'react';
import styled from 'styled-components';
import FooterContainer from '../../containers/Layout/FooterContainer';
import HeaderContainer from '../../containers/Layout/HeaderContainer';
import LeftMenuContainer from '../../containers/Layout/LeftMenuContainer';
import LeftMenu from './LeftMenu';

const MasterWrapper = styled.div`
	display
`;

interface IProps {
	propContents: React.ComponentType;
	children: React.ReactNode;
}

const Master: React.FC = (props: IProps) => (
	<MasterWrapper>
		<HeaderContainer />
		<LeftMenuContainer />
		<div id='contents'>{props.children}</div>
		<FooterContainer />
	</MasterWrapper>
);

export default Master;
