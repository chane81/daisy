import { flow, Instance, types } from 'mobx-state-tree';
import { getPlayList } from '../apis/youtubeApi';

/** 썸네일 모델 */
const thumbnailModel = types.model('thumbnailModel', {
	height: types.number,
	url: types.string,
	width: types.number
});

/** 재생 아이템 모델 */
const playItemModel = types.model('playItemModel', {
	id: types.string,
	publishedAt: types.string,
	channelId: types.string,
	title: types.string,
	description: types.string,
	thumbnails: types.model({
		default: types.maybe(thumbnailModel),
		medium: types.maybe(thumbnailModel),
		high: types.maybe(thumbnailModel),
		standard: types.maybe(thumbnailModel),
		maxres: types.maybe(thumbnailModel)
	}),
	channelTitle: types.string,
	playlistId: types.string,
	position: types.number,
	resourceId: types.model({
		kind: types.string,
		videoId: types.string
	})
});

const model = types
	.model('playItemCollectionModel', {
		/** 스토어 아이덴티티 */
		identifier: types.optional(
			types.identifier,
			'playItemCollectionModel'
		),
		playItemList: types.array(playItemModel)
	})
	.actions(self => ({
		/* 재생목록가져오기
		 * playlistId: 가져올 플레이리스트 ID
		 * maxResults: 최대 개수
		 */
		getPlayList: flow(function*(playlistId: string, maxResults: number) {
			const res = yield getPlayList(playlistId, maxResults);

			self.playItemList = res;
		})
	}));

const defaultValue = {
	identifier: 'playItemCollectionModel',
	playItemList: []
};

const create = model.create(defaultValue);

const playItemCollectionStore = {
	create,
	defaultValue,
	model
};

export type IPlayItemCollectionModelType = Instance<typeof model>;

export default playItemCollectionStore;
