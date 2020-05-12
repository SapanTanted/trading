const express = require('express')
const bodyParser = require('body-parser')

const port = 8080
const app = express()

app.get('/', (req, res) => res.send('Hello world!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))