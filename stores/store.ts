import { applySnapshot, Instance, types } from 'mobx-state-tree';

type IStore = Instance<typeof store>;

let initStore: IStore = null as any;

const store = types
	.model('store', {
		/** 스토어 아이덴티티 */
		identifier: types.optional(types.identifier, 'store'),

		/** 모달 visible 여부 true/false */
		modalVisible: types.optional(types.boolean, false)
	})
	.views((self) => ({}));

const initializeStore = (isServer, snapshot = null) => {
	const defaultValue = {
		modalVisible: false
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
