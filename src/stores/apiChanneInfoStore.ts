import { Instance, types } from 'mobx-state-tree';
import apiTrackListStore from './apiTrackListStore';
import apiItemsStore from './apiItemsStore';

/** 유튜브 API - 채널 정보 모델 - 채널기본정보외에 플레이리스트 정보가 들어감 */
const model = types.model('apiChannelInfoModel', {
	/** 스토어 아이덴티티 */
	identifier: types.optional(types.identifier, 'apiChannelInfoModel'),
	baseInfo: types.optional(
		apiItemsStore.model,
		apiItemsStore.defaultValue
	),
	playList: types.optional(types.array(apiTrackListStore.model), [])
});

/** 초기화 값 */
const defaultValue = {};

const create = model.create({
	baseInfo: apiItemsStore.defaultValue,
	playList: []
});

const apiChannelInfoStore = {
	create,
	defaultValue,
	model
};

export type IApiChannelInfoModelType = Instance<typeof model>;

export default apiChannelInfoStore;
