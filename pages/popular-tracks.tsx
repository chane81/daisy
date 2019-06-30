import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { IStore } from '../src/stores/storeTypes';
import PopularTrackSection from '../src/components/PagesSection/PopularTrackSection';
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
	public async setDataBinding() {
		const { apiModel, playerModel } = this.props.store!;
		const { tracks } = apiModel.popularTrackList;

		// 인기트랙 불러오기
		await apiModel.getPlayListItems(
			process.env.YOUTUBE_API_POPULAR_TRACK_PLAYLIST_ID!,
			20
		);

		// 유튜브플레이어 디폴트 세팅
		if (tracks.length > 0) {
			await playerModel.setPlayer({
				videoId: tracks[0].videoId,
				title: tracks[0].title
			});
		}
	}

	// 썸네일 이미지 클릭시 유튜브 Play
	public handleThumbnailClick = (videoId: string, title: string) => {
		const { playerModel } = this.props.store!;

		playerModel.setPlayer({ videoId, title });
		playerModel.setPlay();
	};

	public render() {
		const { popularTrackList } = this.props.store!.apiModel;

		return (
			<PopularTrackSection
				apiItems={popularTrackList.tracks}
				handleThumbnailClick={this.handleThumbnailClick}
			/>
		);
	}
}

export default inject(({ store }) => ({ store }))(observer(PopularTracks));
