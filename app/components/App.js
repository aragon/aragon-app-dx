import React from 'react'
import { AragonApp, Button, Text } from '@aragon/ui'
import styled from 'styled-components'
import AragonAppConnector from './AragonAppConnector'

export default class App extends React.Component {
  render() {
    return (
      <AragonAppConnector>
        {({ app, appState, account }) => (
          <AppContainer>
            <div>
              <Buttons>
                <Button onClick={() => app.decrement(1)}>decrement</Button>
                <Count>{appState.count}</Count>
                <Button onClick={() => app.increment(1)}>increment</Button>
              </Buttons>
              <Account>Current account: {account}</Account>
            </div>
          </AppContainer>
        )}
      </AragonAppConnector>
    )
  }
}

const AppContainer = styled(AragonApp)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
`

const Count = styled(Text.Block).attrs({ size: 'xxlarge' })`
  text-align: center;
`

const Account = styled(Text.Block).attrs({ size: 'xxsmall' })`
  position: absolute;
  bottom: 10px;
  right: 10px;
`
