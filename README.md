# PhoneProxy

A simple phone proxy application using Twilio and Cloudflare Workers.

Allows you to use a Twilio phone number as a proxy instead of giving out your personal number to strangers.

When a message is sent from any number other than your own, it will automatically be forwarded to your phone.

To reply, type the phone number with no spaces followed by a semicolon before your message. 

(ex: "8008675309; my message")

<img src="/images/Demo.GIF" alt="App demo" height="50%" width="50%">


## Installation

Check out the Cloudflare Workers [getting started guide](https://developers.cloudflare.com/workers/get-started/guide/).

`npm install -g wrangler`

`wrangler login`

`wrangler init <worker name>`

## Update/add secret variables

`wrangler put ACCOUNT_SID` and paste Twilio account SID when prompted.

`wrangler put AUTH_TOKEN` and paste Twilio auth token when prompted.

`wrangler put ACCOUNT_SID` and paste Twilio phone number when prompted.

`wrangler put MY_NUM` and the phone number that you would like to use to receive texts.

## Local development

`wrangler dev`

## Production

`wrangler publish`

