import React from 'react';
import styled, { css } from 'styled-components';
import YouTube from 'react-youtube';
import { device } from '../../library/styleHelper';

interface IOpts {
	height?: string;
	width?: string;
	playerVars?: {
		autoplay: 0 | 1;
		controls: 0 | 1 | 2;
	};
}

/**
 * 설명:						썸네일 카드
 * className:				css class 명
 */
interface IProps {
	className?: string;
	videoId: string;
	title: string;
	opts: IOpts;
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
			transition: height 0.2s linear;
		}
	}

	.youtube-title {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 6rem;
		font-family: 'TmonMonsori', sans-serif;
		font-size: 2rem;
		font-weight: 100;
		overflow-y: hidden;
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
			border-bottom: 1px solid #adb5bd;
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
		<YoutubePlayerWrapper
			videoId={props.videoId}
			title={props.title}
			opts={props.opts}
			leftMenuVisible={props.leftMenuVisible}
			handleReady={props.handleReady}
		>
			<YouTube
				className='youtube'
				videoId={props.videoId}
				opts={props.opts}
				onReady={props.handleReady}
			/>
			<div
				className='youtube-title'
				dangerouslySetInnerHTML={{ __html: props.title }}
			/>
		</YoutubePlayerWrapper>
	);
};

export default YoutubePlayer;
