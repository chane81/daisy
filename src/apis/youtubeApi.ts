import axios from 'axios';
import _ from 'lodash';

const baseUrl = process.env.YOUTUBE_API_BASE_URL;
const apiKey = process.env.YOUTUBE_API_KEY;

/**
 * 유튜브의 미디어 단위
 * 채널 > 플레이리스트 > 트렉리스트(Video List) > Video
 */

/**
 * 유튜브 API - 채널ID에 존재하는 플레이리스트들 가져오기 API 호출
 * 이 플레이리스트들의 ID를 이용해 그에 해당하는 비디오 트렉들을 가져온다.
 * @param channelId 채널ID
 * @param maxResults 최대출력 개수
 */
export const getChannelPlaylist = async (
	channelId: string,
	maxResults: number
) => {
	const url = `${baseUrl}/playlists`;

	const {
		data: { items }
	} = await axios.get(url, {
		params: {
			key: apiKey,
			maxResults,
			part: 'snippet',
			channelId
		}
	});

	const result = await Promise.all(
		_.map(items, async data => ({
			id: _.get(data, ['id']),
			..._.pick(data, ['snippet']).snippet,
			tracks: await getPlayListItems(_.get(data, ['id']), 6)
		}))
	);

	console.log('res', result);
	return result;
};

/** 유튜브 API - 채널의 플레이리스트 제외한 기본정보 가져오기 API  */
export const getChannelBaseInfo = async (channelId: string) => {
	const url = `${baseUrl}/channels`;

	const {
		data: { items }
	} = await axios.get(url, {
		params: {
			key: apiKey,
			id: channelId,
			part: 'snippet,brandingSettings,contentDetails,statistics'
		}
	});

	const item = items[0];

	const result = {
		channelId: item.id,
		title: _.get(item, 'snippet.title'),
		description: _.get(item, 'snippet.description'),
		thumbnails: _.get(item, 'snippet.thumbnails'),
		viewCount: parseInt(_.get(item, 'statistics.viewCount'), 10),
		subscriberCount: parseInt(
			_.get(item, 'statistics.subscriberCount'),
			10
		)
	};

	return result;
};

/**
 * 유튜브 API - 재생목록 가져오기 API 호출
 * @param playlistId 플레이리스트ID
 * @param maxResults 최대출력 개수
 */
export const getPlayListItems = async (
	playlistId: string,
	maxResults: number
) => {
	const url = `${baseUrl}/playlistItems`;

	const {
		data: { items }
	} = await axios.get(url, {
		params: {
			key: apiKey,
			maxResults,
			part: 'snippet',
			playlistId
		}
	});

	/**
	 * _.map(items, _.partialRight(_.pick, ['snippet']).snippet) ===
	 * _.map(items, data => _.pick(data, ['snippet']).snippet)
	 */
	const result = _.map(items, data => ({
		..._.pick(data, ['id']),
		..._.pick(data, ['snippet']).snippet,
		videoId: _.get(data, 'snippet.resourceId.videoId')
	}));

	return result;
};

interface ISearchParams {
	searchText: string;
	maxResults: number;
	order?: string;
	type?: string;
	regionCode?: string;
	videoDefinition?: string;
}

/**
 * 유튜브 API - 검색 API 호출
 * @param searchText 검색 키워드
 * @param maxResults 최대출력 개수
 */
export const getSearch = async ({
	searchText = '',
	maxResults = 10,
	order = 'viewCount',
	type = 'video',
	regionCode = 'KR',
	videoDefinition = 'high'
}: ISearchParams) => {
	const url = `${baseUrl}/search`;

	const params = {
		key: apiKey,
		maxResults,
		part: 'snippet',
		order,
		q: searchText,
		regionCode,
		type,
		videoDefinition
	};

	// videoDefinition 은 type이 video 일 때만 파라메터에 들어가야함
	if (videoDefinition !== 'video') {
		delete params.videoDefinition;
	}

	const {
		data: { items }
	} = await axios.get(url, { params });

	let result;

	switch (type) {
		case 'video': {
			result = _.map(items, data => ({
				id: _.get(data, 'id.videoId'),
				videoId: _.get(data, 'id.videoId'),
				..._.pick(data, ['snippet']).snippet
			}));

			break;
		}
		case 'channel': {
			result = _.map(items, data => ({
				id: _.get(data, 'snippet.channelId'),
				channelId: _.get(data, 'snippet.channelId'),
				..._.pick(data, ['snippet']).snippet
			}));

			break;
		}
	}

	return result;
};
