import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import Header from '../../components/Layout/Header';
import { IStore, IUiModelType } from '../../stores/storeTypes';

/**
 * 설명:						레프트메뉴 컴포넌트
 * className:				css class 명
 * store:						store
 */
interface IProps {
	className?: string;
	store?: IStore;
}

class HeaderContainer extends Component<IProps> {
	private handleNavClick = () => {
		const { uiModel } = this.props.store!;
		uiModel.setLeftMenuToggle();
	};

	private handleSearchClick = (searchText: string) => {
		const { apiModel } = this.props.store!;
		apiModel.getVideoSearch(searchText, 20);
	};

	public render() {
		const { uiModel } = this.props.store!;

		return (
			<Header
				navbarVisible={!uiModel.leftMenuVisible}
				className={this.props.className}
				handleNavClick={this.handleNavClick}
				handleSearchClick={this.handleSearchClick}
			/>
		);
	}
}

export default inject(({ store }) => ({ store }))(
	observer(HeaderContainer)
);
