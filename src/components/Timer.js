import {observer} from 'mobx-react'
import ms from 'pretty-ms'
import React, {Component} from 'react'
import styled from 'styled-components'
import timerStore from '../mobx/app'
import Col from './Col'
import Padder from './Padder'
import Row from './Row'

const _TimerWrapper = styled.div`
  padding: 20px;
  margin: 15px;
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
      time: this.props.timer.time,
      start: 0,
      active: this.props.timer.active,
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
  }

  componentDidMount() {
    this.startTimer()
  }

  startTimer() {
    if (this.state.active) {
      this.setState(
        {
          time: this.props.timer.time,
          start: Date.now() - this.state.time,
          active: true,
        },
        () => {
          timerStore.updateTimerValue(this.props.timer, {
            time: this.state.time,
            active: this.state.active,
          })
        }
      )
      this.timer = setInterval(() => {
        this.setState(
          {
            time: Date.now() - this.state.start,
          },
          () => {
            timerStore.updateTimerValue(this.props.timer, {
              time: this.state.time,
            })
          }
        )
      }, 1000)
    }
  }

  resumeTimer = () => {
    this.setState({active: true}, () => {
      timerStore.updateTimerValue(this.props.timer, {active: true})
      this.startTimer()
    })
  }

  stopTimer = () => {
    clearInterval(this.timer)
    this.setState({active: false}, () => {
      timerStore.updateTimerValue(this.props.timer, {
        time: this.state.time,
        active: false,
      })
    })
  }

  removeTimer = () => {
    clearInterval(this.timer)
    timerStore.removeTimer(this.props.timer)
  }

  render() {
    const {time, start, active} = this.state
    const {timer} = this.props
    return (
      <_TimerWrapper>
        <Row jc="space-between">
          <Col flex={1}>
            <input
              value={timer.name || ''}
              placeholder="timerName"
              onChange={(e) =>
                timerStore.updateTimerName(timer, e.target.value)
              }
            />
          </Col>
          <Col ai="flex-end">
            {ms(time, {
              keepDecimalsOnWholeSeconds: false,
              millisecondsDecimalDigits: 0,
              secondsDecimalDigits: 0,
            })}
            <Row jc="space-between">
              {active && (
                <div className="pointer" onClick={this.stopTimer}>
                  Pause
                </div>
              )}
              {!active && (
                <div className="pointer" onClick={this.resumeTimer}>
                  Resume
                </div>
              )}
              <Padder h={20} w />
              <div className="pointer" onClick={this.removeTimer}>
                Delete
              </div>
            </Row>
          </Col>
        </Row>
      </_TimerWrapper>
    )
  }
}

export default Timer
