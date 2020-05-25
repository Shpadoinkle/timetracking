import localForage from 'localforage'
import {action, observable} from 'mobx'
import {create, persist} from 'mobx-persist'

class Timer {
  @persist
  @observable
  id = ''

  @persist
  @observable
  name = ''

  @persist('object')
  @observable
  timeStart

  @persist('object')
  @observable
  timeEnd
}

class AppStore {
  @observable hydrated = false

  @persist('list', Timer)
  @observable
  list = []

  @action
  addMon(id, toggle = false) {
    this.list.push({id, timeStart: new Date()})
  }

  @action
  removeMon(mon) {
    if (!this.hydrated) return
    this.list = this.list.filter((e) => e.id !== mon.id)
  }

  @action
  updateNickName(mon, name) {
    if (!this.hydrated) return
    this.list = this.list.map((e) => {
      if (e.id === mon.id) {
        e.name = name
      }
      return e
    })
  }

  @action
  clearParty() {
    this.list = []
  }
}

const hydrate = create({
  storage: localForage,
  jsonify: false,
})

// create the state
const appStore = new AppStore()

hydrate('party', appStore).then(() => {
  appStore.hydrated = true
})

export default appStore
