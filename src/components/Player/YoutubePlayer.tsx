import React from 'react';
import styled, { css } from 'styled-components';
import YouTube from 'react-youtube';
import { device } from '../../library/styleHelper';
import { IPlayerModelType } from '../../stores/storeTypes';
import { observer } from 'mobx-react';

/**
 * 설명: 						유튜브 플레이어 컴포넌트
 * className:				css class 명
 * playerOptions:		유튜브 플레이어 옵션
 * leftMenuVisible:	레프트메뉴 visible true/false
 * handleReady:			유튜브 플레이어 ready 이벤트 핸들러
 */
interface IProps {
	className?: string;
	playerOptions: IPlayerModelType;
	leftMenuVisible?: boolean;
	handleReady: (e: any) => void;
}

const YoutubePlayerWrapper = styled('div')<IProps>`
	display: flex;
	flex-flow: column nowrap;
	background-color: #f8f9fa;

	div {
		padding-right: -2px;
		/* 16:9 */
		/* width:height ratio = 16/9 = 1.778 */
		/* height:width ratio = 9/16 = .5625 */
		.youtube {
			display: block;
			width: 100%;
			min-height: calc(55vw * 9 / 16);
			max-height: calc(100vh - 51px - 6rem);
			transition: height 0.3s cubic-bezier(0.01, 1.01, 0.71, 0.99);
		}
	}

	.youtube-title {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 6rem;
		font-family: 'TmonMonsori', sans-serif;
		font-size: 2rem;
		font-weight: 100;
	}

	@media ${device.desktop + ',' + device.tablet} {
		min-width: 55vw;

		.youtube-title {
			flex: 1;
		}
	}

	@media ${device.mobile} {
		.youtube-title {
			flex: 1 1 100;
			font-size: 1.4rem;
			border-bottom: 0.7px solid #adb5bd;
		}

		.youtube {
			height: ${(props: IProps) =>
				(props.leftMenuVisible && css`calc((100vw - 11.4rem) * 9 / 16)`) ||
				(!props.leftMenuVisible && css`calc(100vw * 9 / 16)`)};
		}
	}
`;

const YoutubePlayer: React.FC<IProps> = props => {
	return (
		<YoutubePlayerWrapper {...props}>
			<YouTube
				className='youtube'
				videoId={props.playerOptions.videoId}
				opts={props.playerOptions.opts}
				onReady={props.handleReady}
			/>
			<div
				className='youtube-title'
				dangerouslySetInnerHTML={{ __html: props.playerOptions.title }}
			/>
		</YoutubePlayerWrapper>
	);
};

export default observer(YoutubePlayer);
