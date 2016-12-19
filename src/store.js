import { observable } from 'mobx';

class dietYTStore {
  @observable vid = []
}

var store = window.store = new dietYTStore

export default store
