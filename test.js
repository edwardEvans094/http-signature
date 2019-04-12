const HttpProvider = require('./index')
var https = require('https');

require('dotenv').config()

const gatewayEndpoint = process.env.ENDPOINT
var fs = require('fs');


console.log("_____________", process.env.ENDPOINT, process.env.KEY_ID, process.env.KEY_STRING)
const provider = new HttpProvider(gatewayEndpoint, process.env.KEY_ID, process.env.KEY_STRING)



provider.signingSend('applications', 'GET', null, null)
.then(data => {
  console.log("********&^^^^^^^^^^^", data)
})
.catch(err => {
  console.log("&&&&&&&&&&&&&&", err)
})


// provider.signingSend('applications', 'POST', {
//   "name": "first_app",
//   "addresses": [
//       "0x3baE9b9e1dca462Ad8827f62F4A8b5b3714d7700",
//       "0x804aDa8c08A2E8ecff1a6535bf28DC4f1EfF4f8e"
//   ]
// }, null)
// .then(data => {
//   console.log("********&^^^^^^^^^^^", data)
// })
// .catch(err => {
//   console.log("&&&&&&&&&&&&&&", err)
// })