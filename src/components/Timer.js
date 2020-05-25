import {observer} from 'mobx-react'
import ms from 'pretty-ms'
import React, {Component} from 'react'
import styled from 'styled-components'
import Row from './Row'
import Col from './Col'
import Padder from './Padder'
import appStore from '../mobx/app'

const _TimerWrapper = styled.div`
  padding: 20px;
  margin: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 3px 3px 3px 3px #88888888;
  width: 400px;
`

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
      time: Date.now() - this.props.timer.timeStart,
    })
    this.timer = setInterval(() => {
      this.setState({
        time: Date.now() - this.props.timer.timeStart,
      })
    }, 1)
  }

  removeTimer = () => {
    clearInterval(this.timer)
    appStore.removeMon(this.props.timer)
  }

  render() {
    const {time} = this.state
    const {timer} = this.props
    return (
      <_TimerWrapper>
        <Row jc="space-between">
          <Col flex={1}>
            <input
              value={timer.name}
              placeholder="timerName"
              onChange={(e) => appStore.updateNickName(timer, e.target.value)}
            />
          </Col>
          <Col ai="flex-end">
            {ms(time, {
              keepDecimalsOnWholeSeconds: false,
              millisecondsDecimalDigits: 0,
              secondsDecimalDigits: 0,
            })}
            <Row jc="space-between">
              <div className="pointer">Stop</div>
              <Padder h={20} w />
              <div className="pointer">Delete</div>
            </Row>
          </Col>
        </Row>
      </_TimerWrapper>
    )
  }
}

export default Timer
