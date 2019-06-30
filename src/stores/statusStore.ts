import { Instance, types } from 'mobx-state-tree';

/** 유튜브 API - 채널 정보 모델 - 여러개의 트렉리스트 정보가 들어간다. */
const model = types
	.model('statusModel', {
		/** 스토어 아이덴티티 */
		identifier: types.optional(types.identifier, 'statusModel'),

		/** 비동기 콜 상태값: pending, success, fail */
		now: types.enumeration(['pending', 'success', 'fail']),

		/** 에러정보 */
		error: types.model({
			stack: types.string,
			message: types.string
		})
	})
	.actions(self => ({
		/** 비동기 상태값 Set */
		setStatus(now: 'pending' | 'success' | 'fail') {
			self.now = now;
		},
		/** 에러 발생시 에러 정보 set */
		setError(error) {
			self.error = {
				stack: error.stack,
				message: error.message
			};

			self.now = 'fail';
		}
	}));

/** 초기화 값 */
const defaultValue = {
	now: 'pending',
	error: {
		stack: '',
		message: ''
	}
};

const create = model.create(defaultValue);

const statusStore = {
	create,
	defaultValue,
	model
};

export type IStatuslModelType = Instance<typeof model>;

export default statusStore;
