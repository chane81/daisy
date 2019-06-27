import React from 'react';
import { inject, observer } from 'mobx-react';
import { IStore } from '../../stores/storeTypes';
import TrackList from '../../components/TrackList';

/**
 * 설명:	트렉리스트 컨테이너
 * store:	스토어
 */
interface IProps {
	store?: IStore;
}

class TrackListContainer extends React.Component<IProps> {
	// 썸네일 이미지 클릭시 유튜브 Play
	public handleThumbnailClick = (videoId: string, title: string) => {
		const { playerModel } = this.props.store!;

		playerModel.setPlayer({ videoId, title });
		playerModel.setPlay();
	};

	public render() {
		return (
			<TrackList
				className='track-list'
				handleThumbnailClick={this.handleThumbnailClick}
			></TrackList>
		);
	}
}

export default inject(({ store }) => ({ store }))(
	observer(TrackListContainer)
);
