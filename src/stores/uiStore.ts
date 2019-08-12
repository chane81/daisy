import { Instance, types } from 'mobx-state-tree';

// UI 메시지 모델 - HTML UI 컨트롤의 상태값을 전역으로 관리해야할 때 씀
const model = types
	.model('uiModel', {
		/** 스토어 아이덴티티 */
		identifier: types.optional(types.identifier, 'uiModel'),

		/** 레프트메뉴 Visible true/false  */
		leftMenuVisible: types.boolean,

		/** 레이어 Visible true/false */
		layerVisible: types.boolean
	})
	.actions(self => ({
		/** 레프트메뉴 visible 정보 토글 set */
		setLeftMenuToggle() {
			self.leftMenuVisible = !self.leftMenuVisible;
		},
		setLayerToggle() {
			self.layerVisible = !self.layerVisible;
		}
	}));

const defaultValue = {
	identifier: 'uiModel',
	leftMenuVisible: true,
	layerVisible: false
};

const create = model.create(defaultValue);

const uiStore = {
	create,
	defaultValue,
	model
};

export type IUiModelType = Instance<typeof model>;

export default uiStore;
