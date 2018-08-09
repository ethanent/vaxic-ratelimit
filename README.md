# vaxic-ratelimit
> A powerful rate limit extension for Vaxic.

[GitHub](https://github.com/ethanent/vaxic-ratelimit) | [NPM](https://www.npmjs.com/package/vaxic-ratelimit)

## Install

```shell
npm i vaxic-ratelimit
```

## Usage

First, require the package.

```js
const RateLimiter = require('vaxic-ratelimit')
```

```js
// ... create your Vaxic app ^

const rl = new RateLimiter({
	// options
}, [
	// rules
])

app.use(rl)

// ... start server v
```

## Rules

Rules are Objects.
Properties of a rule:
- `time` *required* - How much time to look through logs for to find matching requests. This is an array, which looks like this: `[5, 'seconds']` or `[6, 'minutes']`
- `limit` *required* - How many requests to allow within this period of time
- `method` - Request method
- `pathname` - Request pathname. Can be a Regular Expression or a String.
- `blockMessage` - Message to respond with when blocking (as error property of JSON response)

## Options

Options:
- `cloudflare` - If enabled, uses the `CF-Connecting-IP` header to detect client IPs
- `blockMessage` - Message to respond with when blocking (used when no blockMessage is defined)
- `varyLimit`- If enabled, varies limit for rules per request by up to 2 requests, making it harder for attackers to detect ratelimiting rules