import { observable } from 'mobx';

class dietYTStore {
  @observable q = '';
}

let store = window.store = new dietYTStore();

export default store
