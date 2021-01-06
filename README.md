# Instagram Token Exchange

This repo is intended as a placeholder example for exchanging an Instagram short-lived token with a long-lived token, which can be used to request data from the Instagram Basic Display API.

## Install

You will need to create a `.env` file in the root directory, specifying the following variables:

```
INSTAGRAM_CLIENT_ID=
INSTAGRAM_CLIENT_SECRET=
PORT=3000
```

The client ID and secret can be found in the facebook Instagram app’s settings dashboard.

## :rocket: Start the server

Run `yarn install` then `yarn start` The server will be available to receive token requests at `/token`.
