import { NextComponentType } from 'next';
import React from 'react';
import HeaderContainer from '../../containers/layout/HeaderContainer';
import Footer from './Footer';
import LeftMenu from './LeftMenu';

interface IProps {
	propContents: React.ComponentType;
	children: React.ReactNode;
}

const Master: React.FC = (props: IProps) => (
	<div id='wrap'>
		<HeaderContainer />
		<LeftMenu />
		<div id='contents'>{props.children}</div>
		<Footer />
	</div>
);

export default Master;
