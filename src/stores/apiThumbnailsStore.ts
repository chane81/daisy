import { Instance, types } from 'mobx-state-tree';

/** 유튜브 API - 썸네일 사이즈, URL 정보 모델 */
const apiThumbnailDetailModel = types.model('apiThumbnailDetailModel', {
	url: types.string,
	width: types.maybe(types.number),
	height: types.maybe(types.number)
});

/** 유튜브 API - 썸네일 사이즈별 모델 */
const model = types.model('apiThumbnailsModel', {
	/** 스토어 아이덴티티 */
	identifier: types.optional(types.identifier, 'apiThumbnailsModel'),
	default: types.maybe(apiThumbnailDetailModel),
	medium: types.maybe(apiThumbnailDetailModel),
	high: types.maybe(apiThumbnailDetailModel),
	standard: types.maybe(apiThumbnailDetailModel),
	maxres: types.maybe(apiThumbnailDetailModel)
});

/** 초기화 값 */
const defaultValue = {};

const create = model.create(defaultValue);

const apiThumbnailsStore = {
	create,
	defaultValue,
	model
};

export type IApiThumbnailsModelType = Instance<typeof model>;

export default apiThumbnailsStore;
