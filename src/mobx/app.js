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

  @persist
  @observable
  active = true

  @persist
  @observable
  time = 0

  @persist('object')
  @observable
  timeStart

  @persist('object')
  @observable
  timeEnd
}

class TimerStore {
  @observable hydrated = false

  @persist('list', Timer)
  @observable
  list = []

  @action
  addNewTimer(id, toggle = false) {
    this.list.push({
      id,
      active: true,
      time: 0,
      timeStart: new Date(),
    })
  }

  @action
  removeTimer(mon) {
    if (!this.hydrated) return
    this.list = this.list.filter((e) => e.id !== mon.id)
  }

  @action
  updateTimerName(mon, name) {
    if (!this.hydrated) return
    this.list = this.list.map((e) => {
      if (e.id === mon.id) {
        e.name = name
      }
      return e
    })
  }

  @action
  updateTimerValue(mon, newData) {
    this.list = this.list.map((e) => {
      if (e.id === mon.id) {
        e = {...e, ...newData}
      }
      return e
    })
  }
}

const hydrate = create({
  storage: localForage,
  jsonify: false,
})

// create the state
const timerStore = new TimerStore()

hydrate('timer', timerStore).then(() => {
  timerStore.hydrated = true
})

export default timerStore
