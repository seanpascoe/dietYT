import { observable } from 'mobx';

class dietYTStore {
  @observable vids = ['hey', 'whats', 'up'];
}

let store = window.store = new dietYTStore

export default store
