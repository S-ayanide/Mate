// eslint-disable-next-line import/named
import { action, createStore, Action, createTypedHooks } from 'easy-peasy';
// eslint-disable-next-line import/named
import { User } from 'firebase/auth';

interface StoreModel {
  activeUser: User | undefined;
  chatID: string;
  setActiveUser: Action<StoreModel, User | undefined>;
  setChatID: Action<StoreModel, string>;
}

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default createStore<StoreModel>({
  activeUser: undefined,
  chatID: '',
  setActiveUser: action((state, payload) => {
    state.activeUser = payload;
  }),
  setChatID: action((state, payload) => {
    state.chatID = payload;
  }),
});
