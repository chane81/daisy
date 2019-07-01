import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { IStore } from '../src/stores/storeTypes';
import ChannelListLayout from '../src/layout/pages/ChannelListLayout';
import { Router, withRouter } from '../src/library/routerHelper';

/**
 * 설명:	채널리스트 page
 * store:	스토어
 */
interface IProps {
	store?: IStore;
}

class ChannelList extends Component<IProps> {
	public constructor(props) {
		super(props);

		// k-pop 채널 불러오기
		this.props.store!.apiModel.getChannelSearch('k-pop official', 12);
	}

	// 썸네일 이미지 클릭시 유튜브 Play
	public handleThumbnailClick = (
		videoId: string,
		title: string,
		channelId: string
	) => {
		Router.pushRoute('channel-playlist', { channelId });
	};

	public render() {
		return (
			<ChannelListLayout
				handleThumbnailClick={this.handleThumbnailClick}
				apiChannelItems={this.props.store!.apiModel.channelList}
			/>
		);
	}
}

export default inject(({ store }) => ({ store }))(observer(ChannelList));
