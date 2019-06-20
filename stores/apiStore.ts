import { flow, Instance, types } from 'mobx-state-tree';
import { getPlayListItems, getSearch } from '../apis/youtubeApi';
import apiItemsStore from './apiItemsStore';

const model = types
	.model('apiModel', {
		/** 스토어 아이덴티티 */
		identifier: types.optional(types.identifier, 'apiModel'),

		/** 재생목록 */
		playlistItems: types.array(apiItemsStore.model)
	})
	.actions(self => ({
		/* 재생목록가져오기
		 * playlistId: 가져올 플레이리스트 ID
		 * maxResults: 최대 개수
		 */
		getPlayListItems: flow(function*(
			playlistId: string,
			maxResults: number
		) {
			const res = yield getPlayListItems(playlistId, maxResults);

			self.playlistItems = res;
		}),
		getSearch: flow(function*(searchText: string, maxResults: number) {
			const res = yield getSearch(searchText, maxResults);

			self.playlistItems = res;
		})
	}));

const defaultValue = {
	identifier: 'apiModel',
	playItemList: []
};

const create = model.create(defaultValue);

const apiStore = {
	create,
	defaultValue,
	model
};

export type IApiModelType = Instance<typeof model>;

export default apiStore;
