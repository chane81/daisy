import { Instance, types } from 'mobx-state-tree';
import apiThumbnailStore from './apiThumbnailsStore';

/** 유튜브 API - 아이템 모델 */
const model = types.model('apiItemsModel', {
	/** 스토어 아이덴티티 */
	identifier: types.optional(types.identifier, 'apiItemsModel'),
	id: types.optional(types.string, ''),
	publishedAt: types.optional(types.string, ''),
	channelId: types.optional(types.string, ''),
	title: types.optional(types.string, ''),
	description: types.optional(types.string, ''),
	thumbnails: types.maybe(apiThumbnailStore.model),
	channelTitle: types.optional(types.string, ''),
	playlistId: types.optional(types.string, ''),
	position: types.optional(types.number, 0),
	videoId: types.optional(types.string, '')
});

/** 초기화 값 */
const defaultValue = {
	thumbnails: apiThumbnailStore.defaultValue
};

const create = model.create(defaultValue);

const apiItemsStore = {
	create,
	defaultValue,
	model
};

export type IApiItemsModelType = Instance<typeof model>;

export default apiItemsStore;
