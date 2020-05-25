import React, {Component} from 'react'
import {observer} from 'mobx-react'
import appStore from '../mobx/app'
import ms from 'pretty-ms'

@observer
class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0,
    }
    this.startTimer = this.startTimer.bind(this)
  }
  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  startTimer() {
    this.setState({
      time: Date.now() - this.props.thing.timeStart,
    })
    this.timer = setInterval(() => {
      this.setState({
        time: Date.now() - this.props.thing.timeStart,
      })
    }, 1)
  }

  removeTimer = () => {
    clearInterval(this.timer)
    appStore.removeMon(this.props.thing)
  }

  render() {
    const {time} = this.state
    return (
      <div onClick={this.removeTimer}>
        {ms(time, {formatSubMilliseconds: false})}
      </div>
    )
  }
}

export default Timer
