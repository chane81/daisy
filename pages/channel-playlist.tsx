import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { IStore } from '../src/stores/storeTypes';
// import TrackListContainer from '../src/containers/TrackList/TrackListContainer';
import ChannelPlaylistSection from '../src/components/PagesSection/ChannelPlaylistSection';
import { Router, withRouter } from '../src/library/routerHelper';

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
		const channelId = props.router.query.channelId;
		console.log('ff:', channelId);
		// this.props.store!.apiModel.getChannelPlaylist(channelId, 10);
	}

	public handleThumbnailClick = (
		videoId: string,
		title: string,
		channelId: string
	) => {};

	public render() {
		return (
			<div>
				<ChannelPlaylistSection
					handleThumbnailClick={this.handleThumbnailClick}
				/>
			</div>
		);
	}
}

export default inject(({ store }) => ({ store }))(
	observer(withRouter(ChannelPlaylist))
);
