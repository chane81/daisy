import axios from 'axios';
import _ from 'lodash';

const baseUrl = process.env.YOUTUBE_API_BASE_URL;
const apiKey = process.env.YOUTUBE_API_KEY;

// playlistId: 'PLTDluH66q5mpm-Bsq3GlwjMOHITt2bwXE'
// maxResults: 10
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
				..._.pick(data, ['snippet']).snippet,
				videoId: _.get(data, 'id.videoId')
			}));

			break;
		}
		case 'channel': {
			result = _.map(items, data => ({
				id: _.get(data, 'snippet.channelId'),
				..._.pick(data, ['snippet']).snippet
			}));

			break;
		}
	}

	return result;
};
