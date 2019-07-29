import { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { IStore } from '../src/stores/storeTypes';
import ChannelPlaylistLayout from '../src/layout/pages/ChannelPlaylistLayout';
import { withRouter } from '../src/library/routerHelper';
import Loading from '../src/components/Etc/Loading';

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
	}

	// 썸네일 클릭시
	public handleThumbnailClick = (
		videoId: string,
		title: string,
		channelId: string
	) => {
		console.log('video ID:', videoId);
		console.log('title:', title);

		const { playerModel } = this.props.store!;

		playerModel.setPlayer({ videoId, title });
		playerModel.setPlay();
	};

	// 유튜브 플레이어 onReady 핸들러
	public handlePlayerReady = e => {
		const { playerModel, apiModel } = this.props.store!;

		if (playerModel) {
			let { videoId, title } = playerModel;
			const { playList } = apiModel.channelInfo;

			// 디폴트 데이터 바인딩
			if (!!!videoId && playList.length > 0) {
				videoId = playList[0].tracks[0].videoId;
				title = playList[0].tracks[0].title;
			}

			// 디폴트 videoId 세팅
			playerModel.setPlayer({
				player: e.target,
				videoId,
				title
			});

			playerModel.setStop();
		}
	};

	public render() {
		const { apiModel, uiModel, playerModel } = this.props.store!;

		if (apiModel.status.now === 'pending') {
			// return <div>pending...</div>;
			return <Loading />;
		}

		return (
			<div>
				<ChannelPlaylistLayout
					handleThumbnailClick={this.handleThumbnailClick}
					apiChannelInfo={apiModel.channelInfo}
					leftMenuVisible={uiModel.leftMenuVisible}
					playerOptions={playerModel}
					handlePlayerReady={this.handlePlayerReady}
				/>
			</div>
		);
	}
}

export default withRouter(
	inject(({ store }) => ({ store }))(observer(ChannelPlaylist))
);
