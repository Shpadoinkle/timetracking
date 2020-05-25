import {observer} from 'mobx-react'
import React, {Component} from 'react'
import styled from 'styled-components'
import Col from '../components/Col'
import Padder from '../components/Padder'
import Timer from '../components/Timer'
import appStore from '../mobx/app'

const _Button = styled.div`
  padding: 12px 20px;
  margin: 10px;
  background-color: #000;
  color: #fff;
  box-shadow: 3px 3px 3px 3px #88888888;
  width: 200px;
  border-radius: 30px;
  text-align: center;
  font-size: 14px;
  font-weight: 800;
`

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
      <Col
        style={{
          maxWidth: 800,
          margin: '0px auto',
        }}
        ai="center"
      >
        <Padder h={30} />
        <div>My Timers</div>
        <_Button onClick={this.createTimer}>+ Add Timer</_Button>
        {appStore.list.map((e) => (
          <Timer timer={e} key={e.id} />
        ))}
      </Col>
    )
  }
}

export default Timers