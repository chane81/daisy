import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import ThumbnailCard from './ThumbnailCard';
import {
	IApiItemsModelType,
	IApiChannelModelType
} from '../../stores/storeTypes';
import { device } from '../../library/styleHelper';

/**
 * 설명:									썸네일리스트
 * className:							css class 명
 * apiItems:							썸네일 리스트로 표시할 데이터들
 * handleThumbnailClick:	썸네일 클릭시 이벤트 핸들러
 */
interface IProps {
	className?: string;
	apiItems?: IApiItemsModelType[];
	handleThumbnailClick?: (
		videoId: string,
		title: string,
		channelId: string
	) => void;
	cardFlexBasis?: string;
	cardWidth?: string;
	cardHeight?: string;
}

const ThumbnailListCardWrapper = styled('div')<IProps>`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	align-content: flex-start;

	@media ${device.mobile} {
		overflow-y: scroll;
		flex: 1;
	}

	/* scroll 바 */
	overflow-y: auto;
	::-webkit-scrollbar-thumb {
		background-color: #ced4da;
		border-radius: 8px;
		-webkit-border-radius: 8px;
		-moz-border-radius: 8px;
		-ms-border-radius: 8px;
		-o-border-radius: 8px;
	}
	&::-webkit-scrollbar {
		width: 8px;
	}
	&::-webkit-scrollbar-track {
		background: #f8f9fa;
	}
	/* scroll 바 */
`;

const ThumbnailListCard: React.FC<IProps> = props => {
	return (
		<ThumbnailListCardWrapper className={props.className}>
			{props.apiItems!.map((data, index) => (
				<ThumbnailCard
					key={index}
					className={'thumbnail-card'}
					videoId={data.videoId}
					channelId={data.channelId}
					imageUrl={data.thumbnails!.high!.url}
					title={data.title}
					width={props.cardWidth}
					height={props.cardHeight}
					flexBasis={props.cardFlexBasis}
					handleClick={props.handleThumbnailClick}
				/>
			))}
		</ThumbnailListCardWrapper>
	);
};

export default observer(ThumbnailListCard);
