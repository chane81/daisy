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
	return _.map(items, data => ({
		..._.pick(data, ['id']),
		..._.pick(data, ['snippet']).snippet,
		videoId: _.get(data, 'snippet.resourceId.videoId')
	}));
};

/**
 * 유튜브 API - 검색 API 호출
 * @param searchText 검색 키워드
 * @param maxResults 최대출력 개수
 */
export const getSearch = async (
	searchText: string,
	maxResults: number
) => {
	const url = `${baseUrl}/search`;

	const {
		data: { items }
	} = await axios.get(url, {
		params: {
			key: apiKey,
			maxResults,
			part: 'snippet',
			order: 'viewCount',
			q: searchText,
			type: 'video',
			videoDefinition: 'high'
		}
	});

	return _.map(items, data => ({
		id: _.get(data, 'id.videoId'),
		..._.pick(data, ['snippet']).snippet,
		videoId: _.get(data, 'id.videoId')
	}));
};
