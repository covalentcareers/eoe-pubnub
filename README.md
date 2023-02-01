## Getting Started

First, update the pub/sub/secret keys in `.env.development`

Run the development server:

```bash
npm i
npm run dev
```

## Context and steps to reproduce 

* The server generates two unique tokens and returns them to the client (see `api/token.js`)
* Using the tokens, the client initializes two Pubnub instances (see `index.js`)
* A `<User>` component is initialized for each Pubnub client
* The `<User>` component sets up message/object listeners and joins the `test` channel
* Click "Send Message" to send a message from the channel from each user
* Confirm in the console that the message handler fires twice (once for each client)
* Click "Update Metadata" to update the metadata for each user
* Confirm in the console that the objects handler does not fire for metadata updates, despite users belonging to the same `test` channel
* Update `User.js` line 21 to subscribe users to each others channels:

`pn.subscribe({channels: ['USER_A', 'USER_B']})`

* Click "Update Metadata" to update the metadata for each user
* Confirm that the object now listener fires twice, once for each client

## Expected behavior

Since both users are subscribed to the `test` channel, they should receive metadata updates from other users in the channel, without having to subscribe to each user's channel.

Relevant docs: https://www.pubnub.com/docs/chat/sdks/users/user-metadata#user-events

> User events are triggered when user metadata is set or deleted. Other users can receive these events by subscribing to the user's channel or if they are members of the same channel.
