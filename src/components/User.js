import {Button, ButtonGroup} from '@chakra-ui/react'
import {useChannelMembers, useChannels} from '@pubnub/react-chat-components'
import {usePubNub} from 'pubnub-react'
import {useEffect} from 'react'

export default function User({uuid}) {
  const pn = usePubNub()

  useEffect(() => {
    const listener = {
      message: (message) => {
        console.log({uuid, message})
      },
      objects: (object) => {
        console.log({uuid, object})
      },
    }
    pn.addListener(listener)
    console.log('Added listener', listener)

    pn.subscribe({channels: ['test']})

    return () => {
      pn.removeListener(listener)
      console.log('Removed listener', listener)
    }
  }, [pn])

  const sendMessage = async () => {
    await pn.publish({
      channel: 'test',
      message: new Date(),
    })
  }

  const setMetadata = async (uuid) => {
    await pn.objects.setUUIDMetadata({
      uuid,
      data: {
        custom: {
          lastUpdated: new Date(),
        },
      },
    })
  }

  return (
    <ButtonGroup colorScheme="blue">
      <div>
        <Button onClick={sendMessage}>Send message</Button>
      </div>
      <div>
        <Button onClick={() => setMetadata(uuid)}>Set {uuid} metadata</Button>
      </div>
    </ButtonGroup>
  )
}
