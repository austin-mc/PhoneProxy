# PhoneProxy

A simple phone proxy application using Twilio and Cloudflare Workers.



## Installation

Check out the Cloudflare Workers [getting started guide](https://developers.cloudflare.com/workers/get-started/guide/).

`npm install -g wrangler`
`wrangler login`
`wrangler init <worker name>`

## Update/add secret variables

`wrangler put ACCOUNT_SID` and paste Twilio account SID when prompted.
`wrangler put AUTH_TOKEN` and paste Twilio auth token when prompted.
`wrangler put ACCOUNT_SID` and paste Twilio phone number when prompted.


## Local development

`wrangler dev index.js`

## Production

`wrangler publish index.js`

