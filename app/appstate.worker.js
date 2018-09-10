import Aragon from '@aragon/client'

const INITIAL_STATE = {
  count: 0,
}

const app = new Aragon()

app.cache('state', INITIAL_STATE)

app.store(async (state, event) => {
  if (state === null) state = INITIAL_STATE

  switch (event.event) {
    case 'Increment':
      return { count: await getValue() }
    case 'Decrement':
      return { count: await getValue() }
    default:
      return state
  }
})

// Get current value from the contract by calling the public getter
function getValue() {
  return new Promise(resolve => {
    app
      .call('value')
      .first()
      .map(value => parseInt(value, 10))
      .subscribe(resolve)
  })
}
