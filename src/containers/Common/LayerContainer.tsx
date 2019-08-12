import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import Layer from '../../components/Common/Layer';
import { IStore } from '../../stores/storeTypes';

interface IProps {
	className?: string;
	children?: React.ReactNode;
	store?: IStore;
	handleLayerClose?: () => void;
}

class FooterContainer extends Component<IProps> {
	public render() {
		const { uiModel } = this.props.store!;

		const handleCloseClick = () => {
			this.props.handleLayerClose!();
			uiModel.setLayerToggle();
		};

		return (
			<Layer
				className={this.props.className}
				visible={uiModel.layerVisible}
				children={this.props.children}
				handleCloseClick={handleCloseClick}
			/>
		);
	}
}

export default inject(({ store }) => ({ store }))(
	observer(FooterContainer)
);
