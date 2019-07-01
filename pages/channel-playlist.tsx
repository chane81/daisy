import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { IStore } from '../src/stores/storeTypes';
import ChannelPlaylistLayout from '../src/layout/pages/ChannelPlaylistLayout';
import { Router, withRouter } from '../src/library/routerHelper';
import apiChannelStore from '../src/stores/apiChannelStore';

/**
 * 설명:	채널리스트 page
 * store:	스토어
 */
interface IProps {
	store?: IStore;
	router: any;
}

class ChannelPlaylist extends Component<IProps> {
	public constructor(props) {
		super(props);

		this.getChannelInfo();
	}

	public async getChannelInfo() {
		const { apiModel } = this.props.store!;
		const channelId = this.props.router.query.channelId;

		// 해당 채널의 플레이 리스트 불러오기
		await apiModel.getChannelInfo(channelId, 5);

		console.log('channelInfo:', apiModel.channelInfo);
	}

	public handleThumbnailClick = (
		videoId: string,
		title: string,
		channelId: string
	) => {
		console.log('channelId:', channelId);
	};

	public render() {
		return (
			<div>
				<ChannelPlaylistLayout
					handleThumbnailClick={this.handleThumbnailClick}
				/>
			</div>
		);
	}
}

export default inject(({ store }) => ({ store }))(
	observer(withRouter(ChannelPlaylist))
);
