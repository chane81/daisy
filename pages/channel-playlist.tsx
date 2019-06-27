import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { IStore } from '../stores/storeTypes';
import TrackListContainer from '../containers/TrackList/TrackListContainer';
import Router, { withRouter, SingletonRouter } from 'next/router';

/**
 * 설명:	채널리스트 page
 * store:	스토어
 */
interface IProps {
	store?: IStore;
}

class ChannelPlaylist extends Component<IProps> {
	public constructor(props) {
		super(props);

		// 해당 채널의 플레이 리스트 불러오기
		const channelId = props.router.query.id;
		this.props.store!.apiModel.getChannelPlaylist(channelId, 10);
	}

	public render() {
		return <TrackListContainer />;
	}
}

export default inject(({ store }) => ({ store }))(
	observer(withRouter(ChannelPlaylist))
);
