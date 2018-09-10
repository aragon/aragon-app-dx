import React from 'react'
import ReactDOM from 'react-dom'
import Aragon, { providers } from '@aragon/client'

class AragonAppConnector extends React.Component {
  state = {
    app: new Aragon(new providers.WindowMessage(window.parent)),
    appState: {},
    account: null,
  }

  componentDidMount() {
    window.addEventListener('message', this.handleWrapperMessage)

    // If using Parcel, reload instead of using HMR. HMR makes the app
    // disconnect from the wrapper and the state is empty until a reload.
    // See: https://github.com/parcel-bundler/parcel/issues/289
    // TODO: add a way to reconnect an app (aragon/aragon + aragon.js)
    if (module.hot) {
      module.hot.dispose(() => {
        window.location.reload()
      })
    }
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.handleWrapperMessage)
  }

  handleWrapperMessage = ({ data }) => {
    if (data.from !== 'wrapper') {
      return
    }

    // handshake between Aragon Core and the iframe, since iframes can lose
    // messages that were sent before they were ready.
    if (data.name === 'ready') {
      const { app } = this.state
      app.state().subscribe(appState => {
        this.setState({ appState: appState || {} })
      })
      app.accounts().subscribe(accounts => {
        this.setState({ account: accounts[0] || null })
      })
      this.sendMessageToWrapper('ready', true)
    }
  }
  sendMessageToWrapper = (name, value) => {
    window.parent.postMessage({ from: 'app', name, value }, '*')
  }
  render() {
    return this.props.children({
      app: this.state.app,
      appState: this.state.appState,
      account: this.state.account,
    })
  }
}

AragonAppConnector.defaultProps = {
  children: () => null,
}

export default AragonAppConnector
