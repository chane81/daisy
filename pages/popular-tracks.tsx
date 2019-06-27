import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { IStore } from '../stores/storeTypes';
import PopularTrackSection from '../components/PagesSection/PopularTrackSection';

/**
 * 설명:	인기트랙 page
 * store:	스토어
 */
interface IProps {
	store?: IStore;
}

class PopularTracks extends Component<IProps> {
	public constructor(props) {
		super(props);

		// 인기트랙 불러오기
		this.props.store!.apiModel.getPlayListItems(
			process.env.YOUTUBE_API_POPULAR_TRACK_PLAYLIST_ID!,
			20
		);
	}

	public render() {
		return <PopularTrackSection />;
	}
}

export default inject(({ store }) => ({ store }))(observer(PopularTracks));
