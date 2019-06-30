import React from 'react';
import styled from 'styled-components';
import { device } from '../../library/styleHelper';
import Master from '../Layout/Master';
import { observer } from 'mobx-react';
import TrackList from '../../components/TrackList';
import { IApiItemsModelType } from '../../stores/storeTypes';
import TrackListContainer from '../../containers/TrackList/TrackListContainer';

/**
 * 설명:									인기트랙 page 의 presentation 컴포넌트
 * className:							css class 명
 */
interface IProps {
	className?: string;
	apiItems?: IApiItemsModelType[];
	handleThumbnailClick?: (
		videoId: string,
		title: string,
		channelId: string
	) => void;
}

const PopularTrackWrapper = styled('div')<IProps>``;

const PopularTrackSection: React.FC<IProps> = props => {
	return (
		<Master>
			<PopularTrackWrapper {...props}>
				<TrackList
					className='track-list'
					apiItems={props.apiItems}
					handleThumbnailClick={props.handleThumbnailClick}
				></TrackList>
			</PopularTrackWrapper>
			;
		</Master>
	);
};

export default observer(PopularTrackSection);
