const HttpProvider = require('./index')
var https = require('https');

require('dotenv').config()

const gatewayEndpoint = 'https://dev-stats-gateway.knstats.com/'
var fs = require('fs');


console.log("_____________", process.env.KEY_ID, process.env.KEY_STRING)
const provider = new HttpProvider(gatewayEndpoint, process.env.KEY_ID, process.env.KEY_STRING)


const path = 'applications'
const params = {

}

provider.signingSend(path, 'GET', null, null)
.then(data => {
  console.log("********&^^^^^^^^^^^", data)
})
.catch(err => {
  console.log("&&&&&&&&&&&&&&", err)
})


// provider.fetchData(gatewayEndpoint + path, {method: 'GET'}).then(data => {
//   console.log("******** data", data)
// }).catch(err => console.log(err))
