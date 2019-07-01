import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import LeftMenu from '../../components/Common/LeftMenu';
import { IStore } from '../../stores/storeTypes';

/**
 * 설명:						레프트메뉴 컴포넌트
 * className:				css class 명
 * store:						store
 */
interface IProps {
	className?: string;
	store?: IStore;
}

class LeftMenuContainer extends Component<IProps> {
	private handleNavClick = () => {
		this.props.store!.uiModel.setLeftMenuToggle();
	};

	public render() {
		return (
			<LeftMenu
				className={this.props.className}
				visible={this.props.store!.uiModel.leftMenuVisible}
				handleNavClick={this.handleNavClick}
			/>
		);
	}
}

export default inject(({ store }) => ({ store }))(
	observer(LeftMenuContainer)
);
