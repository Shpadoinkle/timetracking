import {toJS} from 'mobx'
import {observer} from 'mobx-react'
import React, {Component} from 'react'
import appStore from '../mobx/app'

import Timer from '../components/Timer'

@observer
class Timers extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  createTimer = () => {
    appStore.addMon(appStore.list.length)
  }

  render() {
    return (
      <div>
        <div>My Timers</div>
        <div onClick={this.createTimer}>+ Add Timer</div>
        {appStore.list.map((e) => (
          <Timer thing={e} key={e.id} />
        ))}
      </div>
    )
  }
}

export default Timers
