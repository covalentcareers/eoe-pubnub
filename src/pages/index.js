import {useEffect, useState} from 'react'
import Pubnub from 'pubnub'
import {PubNubProvider} from 'pubnub-react'
import User from '../components/User'
import {Box, ChakraProvider, Flex, Heading} from '@chakra-ui/react'

function App() {
  const [tokens, setTokens] = useState(null)

  const [pnClientA, setPnClientA] = useState(null)
  const [pnClientB, setPnClientB] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/token')
      const json = await response.json()
      console.log(json)
      setTokens(json)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (tokens) {
      setPnClientA(
        new Pubnub({
          publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUB_KEY,
          subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUB_KEY,
          userId: 'USER_A',
          authKey: tokens.tokenA,
          logVerbosity: true,
        }),
      )
      setPnClientB(
        new Pubnub({
          publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUB_KEY,
          subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUB_KEY,
          userId: 'USER_B',
          authKey: tokens.tokenB,
          logVerbosity: true,
        }),
      )
    }
  }, [tokens])

  return (
    <ChakraProvider>
      <div className="App">
        <Flex>
          <Box w="50%" bgColor="gray.50" p={5}>
            <Heading>USER_A</Heading>
            {pnClientA ? (
              <PubNubProvider client={pnClientA}>
                {tokens.tokenA && (
                  <pre>
                    {JSON.stringify(
                      pnClientA.parseToken(tokens.tokenA),
                      null,
                      4,
                    )}
                  </pre>
                )}
                <User uuid="USER_A" />
              </PubNubProvider>
            ) : (
              <div>Connecting...</div>
            )}
          </Box>
          <Box w="50%" bgColor="blue.50" p={5}>
            <Heading>USER_B</Heading>
            {pnClientB ? (
              <PubNubProvider client={pnClientB}>
                {tokens.tokenB && (
                  <pre>
                    {JSON.stringify(
                      pnClientB.parseToken(tokens.tokenB),
                      null,
                      4,
                    )}
                  </pre>
                )}
                <User uuid="USER_B" />
              </PubNubProvider>
            ) : (
              <div>Connecting...</div>
            )}
          </Box>
        </Flex>
      </div>
    </ChakraProvider>
  )
}

export default App
