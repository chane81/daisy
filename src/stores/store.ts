import { applySnapshot, Instance, types } from 'mobx-state-tree';
import apiStore from './apiStore';
import playerStore from './playerStore';
import uiStore from './uiStore';

type IStore = Instance<typeof store>;

let initStore: IStore = null as any;

const store = types
	.model('store', {
		/** 스토어 아이덴티티 */
		identifier: types.optional(types.identifier, 'store'),

		/** UI 모델 */
		uiModel: types.optional(uiStore.model, () => uiStore.create),

		/** 유튜브 DATA API 모델 */
		apiModel: types.optional(apiStore.model, () => apiStore.create),

		/** 유튜브 플레이어 모델 */
		playerModel: types.optional(
			playerStore.model,
			() => playerStore.create
		)
	})
	.views(self => ({}));

const initializeStore = (isServer, snapshot = null) => {
	const defaultValue = {
		uiModel: { ...uiStore.defaultValue },
		apiModel: { ...apiStore.defaultValue },
		playerModel: { ...playerStore.defaultValue }
	};

	// 서버일 경우에 대한 로직 작성
	if (isServer) {
		initStore = store.create(defaultValue);
	}

	// 클라이언트일 경우에 대한 로직 작성
	if ((store as any) === null) {
		initStore = store.create(defaultValue);
	}

	// 스냅샷 있을 경우 스토어에 스냅샷을 적용
	if (snapshot) {
		applySnapshot(initStore, snapshot);
	}

	return initStore;
};

export { initializeStore, IStore };
