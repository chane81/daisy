import React from 'react';
import FooterContainer from '../../containers/Layout/FooterContainer';
import HeaderContainer from '../../containers/Layout/HeaderContainer';
import LeftMenuContainer from '../../containers/Layout/LeftMenuContainer';
import LeftMenu from './LeftMenu';

interface IProps {
	propContents: React.ComponentType;
	children: React.ReactNode;
}

const Master: React.FC = (props: IProps) => (
	<div id='wrap'>
		<HeaderContainer />
		<LeftMenuContainer />
		<div id='contents'>{props.children}</div>
		<FooterContainer />
	</div>
);

export default Master;
