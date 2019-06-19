import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import ThumbnailListCard from '../../components/Cards/ThumbnailListCard';
import { IStore } from '../../stores/storeTypes';

/**
 * 설명:									썸네일리스트 컨테이너
 * className:							css class 명
 * handleThumbnailClick:	썸네일 클릭시 이벤트 핸들러
 */
interface IProps {
	className?: string;
	store?: IStore;
	handleThumbnailClick?: (video: string) => void;
}

class ThumbnailListCardContainer extends Component<IProps> {
	public render() {
		return (
			<ThumbnailListCard
				className={this.props.className}
				playListItems={this.props.store!.apiModel.playlistItems}
				handleThumbnailClick={this.props.handleThumbnailClick}
			/>
		);
	}
}

export default inject(({ store }) => ({ store }))(
	observer(ThumbnailListCardContainer)
);