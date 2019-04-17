# http-signatures

http-signatures is a node.js library that has client and server components
for [HTTP Signature Scheme](https://tools.ietf.org/html/draft-cavage-http-signatures-10).

## Usage

```js
const HttpSignatures = require('http-signatures')

const httpSignatures = new HttpSignatures('https://sample.com/', process.env.KEY_ID, process.env.KEY_STRING)

// send get request to url https://sample.com/applications?address=NewYorks
httpSignatures.signingSend('applications', 'GET', null, {address: 'NewYork'})
            .then(data => {
            })
            .catch(err1 => {
                logger.error(err1);
            })


// send post request with body {name: 'edward evans', age: 25}
// to url https://sample.com/applications
httpSignatures.signingSend('applications', 'POST', {
                name: 'edward evans',
                age: 25
            }, null)
            .then(data => {
            })
            .catch(err2 => {
                logger.error(err2);
            })
```
