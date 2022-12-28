const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const app = express()
const http = require('http')
const server = http.Server(app)

const dist = path.join(__dirname, '/dist')

app.use(express.static(dist))

app.get('*', (req, res) => {
  res.sendFile(path.join(dist, '/index.html'))
})

//app.listen(port)
server.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
