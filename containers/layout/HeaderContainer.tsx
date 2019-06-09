import React, { Component } from 'react';
import Header from '../../components/Layout/Header';

interface IProps {
	className?: string;
}

class HeaderContainer extends Component<IProps> {
	public render() {
		return <Header {...this.props} />;
	}
}

export default HeaderContainer;
