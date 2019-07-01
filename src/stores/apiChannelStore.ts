import { Instance, types, applySnapshot, flow } from 'mobx-state-tree';
import apiTrackListStore from './apiTrackListStore';
import apiThumbnailStore from './apiThumbnailsStore';
import {
	getChannelSimpleInfo,
	getChannelPlaylist
} from '../apis/youtubeApi';

/** 유튜브 API - 채널 정보 모델 - 여러개의 트렉리스트 정보가 들어간다. */
const model = types.model('apiChannelModel', {
	/** 스토어 아이덴티티 */
	identifier: types.optional(types.identifier, 'apiChannelModel'),
	channelId: types.optional(types.string, ''),
	title: types.optional(types.string, ''),
	description: types.optional(types.string, ''),
	thumbnails: types.maybe(apiThumbnailStore.model),
	viewCount: types.optional(types.number, 0),
	subscriberCount: types.optional(types.number, 0)
	// playList: types.optional(types.array(apiTrackListStore.model), [])
});
// .actions(self => ({
// 	setChannel: flow(function*(channelId: string, maxResults: number) {
// 		// channel simple data get
// 		const channelSimpleData = yield getChannelSimpleInfo(channelId);

// 		// playList data get
// 		const channelPlayList = yield getChannelPlaylist(
// 			channelId,
// 			maxResults
// 		);

// 		const result = {
// 			...channelSimpleData,
// 			playList: { ...channelPlayList }
// 		};

// 		console.log('chSimple:', result);

// 		self = { ...self, ...channelSimpleData };
// 	})
// }));

/** 초기화 값 */
const defaultValue = {};

const create = model.create(defaultValue);

const apiChannelStore = {
	create,
	defaultValue,
	model
};

export type IApiChannelModelType = Instance<typeof model>;

export default apiChannelStore;
