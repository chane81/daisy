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

	// 플레이어 ready 시에 스토어에 플레이어객체 저장
	public handleReady = e => {
		const { apiModel, playerModel } = this.props.store!;

		if (apiModel.playlistItems.length > 0) {
			const { videoId, title } = apiModel.playlistItems[0];

			// 디폴트 videoId 세팅
			playerModel.setPlayer({
				player: e.target,
				videoId,
				title
			});
			playerModel.setStop();
		}
	};

	// 썸네일 이미지 클릭시 유튜브 Play
	public handleThumbnailClick = (videoId: string, title: string) => {
		const { playerModel } = this.props.store!;

		playerModel.setPlayer({ videoId, title });
		playerModel.setPlay();
	};

	public render() {
		const { playerModel } = this.props.store!;
		const { uiModel } = this.props.store!;

		return (
			<PopularTrackSection
				className='popular-tracks'
				playerOptions={playerModel}
				leftMenuVisible={uiModel.leftMenuVisible}
				handleYoutubeReady={this.handleReady}
				handleThumbnailClick={this.handleThumbnailClick}
			></PopularTrackSection>
		);
	}
}

export default inject(({ store }) => ({ store }))(observer(PopularTracks));
