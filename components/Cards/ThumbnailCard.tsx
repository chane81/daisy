import React from 'react';
import styled from 'styled-components';
import { device } from '../../library/styleHelper';

/**
 * 설명:						썸네일 카드
 * className:				css class 명
 */
interface IProps {
	className?: string;
	width?: string;
	height?: string;
	imageUrl?: string;
	videoId?: string;
	title?: string;
	flexBasis?: string;
	handleClick?: (videoId: string, title: string) => void;
}

const ThumbnailCardWrapper = styled('div')<IProps>`
	display: flex;
	flex-flow: column wrap;
	width: ${(props: IProps) => props.width};
	height: ${(props: IProps) => props.height};
	flex: 1 ${(props: IProps) => props.flexBasis};

	@media ${device.desktop + ',' + device.tablet} {
		flex: 1 1 13rem;
		margin: 0 0 0.5rem 0.5rem;
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
		border-bottom: 1px solid #adb5bd;
		margin: 0 0.5rem 0.5rem 0.5rem;

		img {
			width: 10rem;
			height: 7rem;
		}
	}

	border: 1px solid #ced4da;
	cursor: pointer;

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
			onClick={() => props.handleClick!(props.videoId!, props.title!)}
		>
			<img src={props.imageUrl} />
			<div
				className='title'
				dangerouslySetInnerHTML={{ __html: props.title! }}
			/>
		</ThumbnailCardWrapper>
	);
};

export default ThumbnailCard;
