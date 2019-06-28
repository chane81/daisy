import React, { Component } from 'react';
import Footer from '../../components/Layout/Footer';

interface IProps {
	className?: string;
}

class FooterContainer extends Component<IProps> {
	public render() {
		return <Footer {...this.props} />;
	}
}

export default FooterContainer;
