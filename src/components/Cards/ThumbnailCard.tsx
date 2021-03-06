import React from 'react';
import styled from 'styled-components';
import { device } from '../../library/styleHelper';

/**
 * 설명:						썸네일 카드
 * className:				css class 명
 * width:						width
 * height:					height
 * imageUrl:				이미지 url
 * videoId:					유튜브 video ID
 * channelId:				유튜브 channel ID
 * title:						제목
 * flexBasis:				flex basis css 값
 * handleClick:			클릭 이벤트 핸들러
 */
interface IProps {
	className?: string;
	width?: string;
	height?: string;
	imageUrl?: string;
	videoId?: string;
	channelId?: string;
	title?: string;
	flexBasis?: string;
	handleClick?: (
		videoId: string,
		title: string,
		channelId: string
	) => void;
}

const ThumbnailCardWrapper = styled('div')<IProps>`
	display: flex;
	flex-flow: column wrap;
	width: ${(props: IProps) => props.width};
	height: ${(props: IProps) => props.height};
	flex: 1 1 ${(props: IProps) => props.flexBasis};
	box-sizing: border-box;
	border: 1px solid #ced4da;
	cursor: pointer;

	@media ${device.desktop + ',' + device.tablet} {
		margin: 0 0.25rem 0.5rem 0.25rem;
		img {
			width: 100%;
		}
	}

	@media ${device.mobile} {
		flex-flow: row nowrap;
		flex: 1 25rem;
		padding: 0 0 0.5rem 0;
		border-top: none;
		border-left: none;
		border-right: none;

		border-bottom: 0.7px solid #adb5bd;
		margin: 0 0.5rem 0.5rem 0.5rem;

		img {
			width: 10rem;
			height: 7rem;
		}
	}

	&:hover {
		background-color: #ffffff;
		opacity: 0.5;
	}

	.title {
		flex: 1;
		font-size: 0.8rem;
		overflow-y: hidden;
		display: flex;
		flex-flow: column wrap;
		justify-content: center;
		align-items: center;
		margin: 0.5rem 0;
	}
`;

const ThumbnailCard: React.FC<IProps> = props => {
	return (
		<ThumbnailCardWrapper
			{...props}
			onClick={() =>
				props.handleClick!(props.videoId!, props.title!, props.channelId!)
			}
		>
			<div>
				<img src={props.imageUrl} />
			</div>
			<div
				className='title'
				dangerouslySetInnerHTML={{ __html: props.title! }}
			/>
		</ThumbnailCardWrapper>
	);
};

export default ThumbnailCard;
