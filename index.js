
const fetch = require('node-fetch');
const Crypto = require('crypto');
const axios = require('axios');
const FETCH_TIMEOUT = 20000;

module.exports = class HttpProvider {
  constructor(hostUrl, keyId, keyString){
    // super(keyId, keyString)
    this.hostUrl = hostUrl
    this.keyId = keyId
    this.keyString = keyString

  }

  paramQuery(data) {
		const formEncodeURIComponent = (uri) => {
			return encodeURIComponent(uri).replace(/%20/g, '+')
		}

    return Object.keys(data).sort().map((k) => {
      if(data[k] instanceof Array){
        return data[k]
        .map(i => (formEncodeURIComponent(k) + '=' + formEncodeURIComponent(i)))
        .join('&')
      }
      return formEncodeURIComponent(k) + '=' + formEncodeURIComponent(data[k])
    }).join('&')
  }

  signingSend(path, method, body, queryParams){  
    let data = body || {}
    let fetchParams = {}
    let containPrams = path.indexOf("?") > -1 

    if(queryParams){
      path = path + '?' +  this.paramQuery(queryParams) 
    }

    let url = this.hostUrl + path
    data = JSON.stringify(data)
    const digest = body ? 'SHA-256=' + Crypto.createHash('SHA256').update(data).digest('base64') : ''
    let signString = ''

    fetchParams.headers = {
      'digest': digest,
      'nonce': new Date().getTime(),
      'content-length': Buffer.byteLength(data),
      'access-control-request-headers': 'nonce, digest, content-length, signature'
    }

    const signingHeader = ['(request-target)', 'nonce', 'digest']
    signingHeader.map((h, i, arr) => {
      switch (h) {
        case '(request-target)':
            signString = signString + h + ": " + method.toLowerCase() + " /" + path
            break;
        default:
            // console.log("____________", h, fetchParams.headers[h])
            signString = signString + h + ": " +  fetchParams.headers[h]
            break;
      }
      if (i < arr.length - 1) signString = signString + "\n"
    })

    const sign = Crypto.createHmac('sha512', this.keyString).update(signString).digest('base64')
    const signatureHeader = 'keyId="' + this.keyId + '",algorithm="hmac-sha512",headers="(request-target) nonce digest",signature="' + sign + '"'
    fetchParams.headers['Signature'] = signatureHeader

  
    if(method){
      fetchParams.method = method
    }
    
    return this.fetchData(url, fetchParams)
  }

  fetchData(url, params){
    console.log('***************', url, params)
    return new Promise((resolve, reject) => {
      fetch(url, params)
        .then((response) => {
          console.log("********** res", response)
          if (!response.ok) {
            reject(response.statusText);
          } else {

            return response.text()
          }
        })
        .then(dataStr => {
          return JSON.parse(dataStr)
        })
        .then(data => {
          resolve(data)
        })
        .catch((err) => {
          reject({
            error: err,
            url: url
          })
        })
    })

  }

}