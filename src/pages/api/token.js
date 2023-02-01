import Pubnub from 'pubnub'

var AdminPubnub = new Pubnub({
  publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUB_KEY,
  subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUB_KEY,
  secretKey: process.env.REACT_APP_PUBNUB_SECRET_KEY,
  heartbeatInterval: 0,
  userId: 'ADMIN',
  ssl: false,
  logVerbosity: true,
})

export default async function handler(req, res) {
  const tokenA = await AdminPubnub.grantToken({
    ttl: 600,
    authorized_uuid: 'USER_A',
    patterns: {
      uuids: {
        '.*': {read: true, get: true},
        USER_A: {update: true, write: true},
      },
      channels: {
        '.*': {read: true, write: true, join: true, get: true},
      },
    },
  })

  const tokenB = await AdminPubnub.grantToken({
    ttl: 600,
    authorized_uuid: 'USER_B',
    patterns: {
      uuids: {
        '.*': {read: true, get: true},
        USER_B: {update: true, write: true},
      },
      channels: {
        '.*': {read: true, write: true, join: true, get: true},
      },
    },
  })

  res.status(200).json({tokenA, tokenB})
}
