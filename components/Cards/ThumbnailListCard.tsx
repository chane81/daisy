import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import ThumbnailCard from './ThumbnailCard';
import { IApiItemsModelType } from '../../stores/storeTypes';

/**
 * 설명:									썸네일리스트
 * className:							css class 명
 * handleThumbnailClick:	썸네일 클릭시 이벤트 핸들러
 */
interface IProps {
	className?: string;
	playListItems?: IApiItemsModelType[];
	handleThumbnailClick?: (videoId: string) => void;
}

const ThumbnailListCardWrapper = styled('div')<IProps>`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding: 1rem 1.5rem 0 1.5rem;
	height: 450px;
	overflow-y: auto;
`;

const ThumbnailListCard: React.FC<IProps> = props => {
	return (
		<ThumbnailListCardWrapper>
			{props.playListItems!.map(data => (
				<ThumbnailCard
					key={data.id}
					className={'thumbnail-card'}
					videoId={data.videoId}
					imageUrl={data.thumbnails!.medium!.url}
					title={data.title}
					flexBasis={'18.75rem'}
					handleClick={props.handleThumbnailClick}
				/>
			))}
		</ThumbnailListCardWrapper>
	);
};

export default observer(ThumbnailListCard);
