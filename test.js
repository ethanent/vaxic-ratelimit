const V = require('vaxic')
const RateLimiter = require(__dirname)

const app = new V()

const rl = new RateLimiter({
	'cloudflare': false,
	'blockMessage': 'You are being ratelimited.'
}, [
	{
		'limit': 30,
		'time': [1, 'minute'],
		'method': 'GET'
	},
	{
		'limit': 2,
		'time': [5, 's'],
		'blockMessage': 'Too many requests to /hello2',
		'pathname': /^\/hello2/
	},
	{
		'limit': 5,
		'time': [15, 'seconds'],
		'blockMessage': 'You\'re POSTing too quickly!',
		'method': 'POST'
	}
])

app.use(rl.extension)

app.add('GET', '/hey', (req, res) => {
	res.writeHead(200)
	res.end('Hi!')
})

app.add('POST', '/hello', (req, res) => {
	res.writeHead(200)
	res.end('Hi there!')
})

app.add('POST', '/hello2', (req, res) => {
	res.writeHead(200)
	res.end('Hello 2!')
})

app.add((req, res) => {
	res.writeHead(404)
	res.end(JSON.stringify({
		'error': 'Resource not found'
	}))
})

app.listen(8080, () => {
	console.log('Listening')
})