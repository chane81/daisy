import React, { Component } from 'react';
import LeftMenu from '../../components/Layout/LeftMenu';

interface IProps {
	className?: string;
}

class LeftMenuContainer extends Component<IProps> {
	public render() {
		return <LeftMenu {...this.props} />;
	}
}

export default LeftMenuContainer;
