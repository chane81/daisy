import { Instance, types } from 'mobx-state-tree';
import apiItemsStore from './apiItemsStore';
import apiThumbnailStore from './apiThumbnailsStore';

/** 유튜브 API - 트렉리스트 모델 - 여러개의 비디오정보 Item 이 들어간다.
 *  하나의 트렉 = 비디오 하나
 */
const model = types.model('apiTrackListModel', {
	/** 스토어 아이덴티티 */
	identifier: types.optional(types.identifier, 'apiTrackListModel'),
	id: types.optional(types.string, ''),
	thumbnails: types.maybe(apiThumbnailStore.model),
	title: types.optional(types.string, ''),
	tracks: types.optional(types.array(apiItemsStore.model), [])
});

/** 초기화 값 */
const defaultValue = {
	identifier: 'apiTrackListModel',
	id: '',
	thumbnails: undefined,
	title: '',
	tracks: []
};

const create = model.create(defaultValue);

const apiTrackListStore = {
	create,
	defaultValue,
	model
};

export type IApiTrackListModelType = Instance<typeof model>;

export default apiTrackListStore;
