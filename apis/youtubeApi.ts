import axios from 'axios';
import _ from 'lodash';

const baseUrl = process.env.YOUTUBE_API_BASE_URL;
const apiKey = process.env.YOUTUBE_API_KEY;

// playlistId: 'PLTDluH66q5mpm-Bsq3GlwjMOHITt2bwXE'
// maxResults: 10
/**
 * 유튜브 API - 재생목록 가져오기 API 호출
 * @param playlistId 플레이리스트ID
 * @param maxResults 최대개수
 */
export const getPlayList = async (
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
		..._.pick(data, ['snippet']).snippet
	}));
};
