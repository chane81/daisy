import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { IStore } from '../stores/storeTypes';
import PopularTrackTemplate from '../components/PagesTemplate/PopularTrackTemplate';

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
		const item = apiModel.playlistItems[0];

		// 디폴트 videoId 세팅
		playerModel.setVideoId(item.videoId);
		playerModel.setPlayer(e.target);
		playerModel.setTitle(item.title);
		playerModel.setStop();
	};

	// 썸네일 이미지 클릭시 유튜브 Play
	public handleThumbnailClick = (videoId: string, title: string) => {
		const { playerModel } = this.props.store!;

		playerModel.setVideoId(videoId);
		playerModel.setTitle(title);
		playerModel.setPlay();
	};

	public render() {
		const { playerModel } = this.props.store!;
		const { uiModel } = this.props.store!;

		return (
			<PopularTrackTemplate
				className='popular-tracks'
				playerOptions={playerModel}
				leftMenuVisible={uiModel.leftMenuVisible}
				handleYoutubeReady={this.handleReady}
				handleThumbnailClick={this.handleThumbnailClick}
			></PopularTrackTemplate>
		);
	}
}

export default inject(({ store }) => ({ store }))(observer(PopularTracks));
