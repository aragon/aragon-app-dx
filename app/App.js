import React from 'react'
import styled from 'styled-components'
import { Button } from '@aragon/ui'
import { AragonAppConnector } from '../future'
import { Main, Counter, Label, Account } from './components'

class App extends React.Component {
  render() {
    return (
      <AragonAppConnector>
        {({ app, appState, account }) => (
          <Main>
            <Counter>
              <Button onClick={() => app.decrement(1)}>decrement</Button>
              <Label>{appState.count}</Label>
              <Button onClick={() => app.increment(1)}>increment</Button>
            </Counter>
            <Account>Current account: {account}</Account>
          </Main>
        )}
      </AragonAppConnector>
    )
  }
}

export default App
