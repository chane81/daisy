import { inject, observer } from 'mobx-react';
import { Component } from 'react';
import YouTube from 'react-youtube';
import Master from '../components/Layout/Master';
import { IStore } from '../stores/storeTypes';

interface IProps {
	store?: IStore;
}

class PopularTracks extends Component<IProps> {
	public constructor(props) {
		super(props);

		// 인기트랙 불러오기
		this.props.store!.playItemCollectionModel.getPlayList(
			'PLTDluH66q5mpm-Bsq3GlwjMOHITt2bwXE',
			20
		);
	}

	// 이미지 클릭시 해당노래 play
	public handleClick = e => {
		const { playerModel } = this.props.store!;

		const videoId = e.currentTarget.dataset.videoId;

		playerModel.setVideoId(videoId);
	};

	// 플레이어 ready 시에 스토어에 플레이어객체 저장
	public handleReady = e => {
		this.props.store!.playerModel.setPlayer(e.target);
	};

	public render() {
		const { playItemCollectionModel, playerModel } = this.props.store!;

		return (
			<Master>
				<div>
					<YouTube
						videoId={playerModel.videoId}
						opts={playerModel.opts}
						onReady={this.handleReady}
					/>
				</div>
				<div>
					{playItemCollectionModel.playItemList.map(data => (
						<img
							key={data.id}
							data-video-id={data.resourceId.videoId}
							src={data.thumbnails.medium!.url}
							onClick={this.handleClick}
						/>
					))}
				</div>
			</Master>
		);
	}
}

export default inject(({ store }) => ({ store }))(observer(PopularTracks));
