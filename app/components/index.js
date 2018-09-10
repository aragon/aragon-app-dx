import styled from 'styled-components'
import { AragonApp, Text } from '@aragon/ui'

export { AragonApp as Main }

export const Counter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  height: 100vh;
  margin: 0 auto;
`

export const Label = styled(Text.Block).attrs({ size: 'xxlarge' })`
  text-align: center;
`

export const Account = styled(Text.Block).attrs({ size: 'xxsmall' })`
  position: absolute;
  bottom: 10px;
  right: 10px;
`
