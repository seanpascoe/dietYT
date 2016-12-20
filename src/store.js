import { observable } from 'mobx';

class dietYTStore {
  @observable vids = [];
  @observable q = '';
}

let store = window.store = new dietYTStore();

export default store
