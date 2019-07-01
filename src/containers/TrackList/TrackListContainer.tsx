import React from 'react';
import { inject, observer } from 'mobx-react';
import { IStore } from '../../stores/storeTypes';
import TrackList from '../../components/TrackList';

interface IProps {
	className?: string;
	store?: IStore;
}

class TrackListContainer extends React.Component<IProps> {
	// 유튜브 플레이어 onReady 핸들러
	public handlePlayerReady = e => {
		const { playerModel, apiModel } = this.props.store!;

		if (playerModel) {
			let { videoId, title } = playerModel;
			const { tracks } = apiModel.trackList;

			// 디폴트 데이터 바인딩 - 처음로딩시 playerMode에 videoId, title 이 없으므로 trackList 에서 데이터가져와서 바이딩함
			if (!!!videoId && tracks.length > 0) {
				videoId = tracks[0].videoId;
				title = tracks[0].title;
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

	// 썸네일 이미지 클릭시 유튜브 Play
	public handleThumbnailClick = (videoId: string, title: string) => {
		const { playerModel } = this.props.store!;

		playerModel.setPlayer({ videoId, title });
		playerModel.setPlay();
	};

	public render() {
		const { apiModel, playerModel, uiModel } = this.props.store!;
		console.log('apimodel:', apiModel);

		return (
			<div>
				<TrackList
					apiItems={apiModel.trackList.tracks}
					playerOptions={playerModel}
					leftMenuVisible={uiModel.leftMenuVisible}
					handlePlayerReady={this.handlePlayerReady}
					handleThumbnailClick={this.handleThumbnailClick}
				/>
			</div>
		);
	}
}

export default inject(({ store }) => ({ store }))(
	observer(TrackListContainer)
);
