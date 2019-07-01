import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { IStore } from '../src/stores/storeTypes';
// import PopularTrackSection from '../src/components/PagesSection/PopularTrackSection';
import PopularTracksLayout from '../src/layout/pages/PopularTracksLayout';
import _ from 'lodash';

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
		this.setDataBinding();
	}

	// 인기트랙 불러오기
	public setDataBinding() {
		const { apiModel } = this.props.store!;

		// 인기트랙 불러오기
		apiModel.getPlayListItems(
			process.env.YOUTUBE_API_POPULAR_TRACK_PLAYLIST_ID!,
			20
		);
	}

	public render() {
		return <PopularTracksLayout />;
	}
}

export default inject(({ store }) => ({ store }))(observer(PopularTracks));
