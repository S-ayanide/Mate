// eslint-disable-next-line import/named
import { action, createStore, Action, createTypedHooks } from 'easy-peasy';
// eslint-disable-next-line import/named
import { User } from 'firebase/auth';

interface StoreModel {
  currentUser: User | undefined;
  activeUser: User | undefined;
  chatID: string;
  setActiveUser: Action<StoreModel, User | undefined>;
  setCurrentUser: Action<StoreModel, User | undefined>;
  setChatID: Action<StoreModel, string>;
}

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default createStore<StoreModel>({
  activeUser: undefined,
  currentUser: undefined,
  chatID: '',
  setCurrentUser: action((state, payload) => {
    state.currentUser = payload;
  }),
  setActiveUser: action((state, payload) => {
    state.activeUser = payload;
  }),
  setChatID: action((state, payload) => {
    state.chatID = payload;
  }),
});
