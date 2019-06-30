import React from 'react';
import { inject, observer } from 'mobx-react';
import { IStore } from '../../stores/storeTypes';
import YoutubePlayer from '../../components/Player/YoutubePlayer';

/**
 * 설명:	인기트랙 page
 * store:	스토어
 */
interface IProps {
	store?: IStore;
}

class YoutubePlayerContainer extends React.Component<IProps> {
	// 플레이어 ready 시에 스토어에 플레이어객체 저장
	public handleReady = e => {
		const { playerModel } = this.props.store!;

		if (playerModel) {
			const { videoId, title } = playerModel;

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
		const { playerModel, uiModel } = this.props.store!;

		return (
			<YoutubePlayer
				className='youtube-player'
				playerOptions={playerModel}
				leftMenuVisible={uiModel.leftMenuVisible}
				handleReady={this.handleReady}
			></YoutubePlayer>
		);
	}
}

export default inject(({ store }) => ({ store }))(
	observer(YoutubePlayerContainer)
);
