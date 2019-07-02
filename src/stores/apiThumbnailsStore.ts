import { Instance, types } from 'mobx-state-tree';

/** 유튜브 API - 썸네일 사이즈, URL 정보 모델 */
const apiThumbnailDetailModel = types.model('apiThumbnailDetailModel', {
	url: types.optional(types.string, ''),
	width: types.maybe(types.number),
	height: types.maybe(types.number)
});

/** apiThumbnailDetailModel 모델의 디폴트 값 */
const apiThumbnailDetailDefaultValue = {
	url: '',
	width: undefined,
	height: undefined
};

/** 유튜브 API - 썸네일 사이즈별 모델 */
const model = types.model('apiThumbnailsModel', {
	/** 스토어 아이덴티티 */
	identifier: types.optional(types.identifier, 'apiThumbnailsModel'),
	default: types.optional(
		apiThumbnailDetailModel,
		apiThumbnailDetailDefaultValue
	),
	medium: types.optional(
		apiThumbnailDetailModel,
		apiThumbnailDetailDefaultValue
	),
	high: types.optional(
		apiThumbnailDetailModel,
		apiThumbnailDetailDefaultValue
	),
	standard: types.optional(
		apiThumbnailDetailModel,
		apiThumbnailDetailDefaultValue
	),
	maxres: types.optional(
		apiThumbnailDetailModel,
		apiThumbnailDetailDefaultValue
	)
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
