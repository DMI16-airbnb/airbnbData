var request = require('request'),
    fs = require('fs'),
    apiKey = 'acc_b4714fa3a1cc37e',
    apiSecret = '19ad71900f3c596e8b9cae5369071ba0',
    imageUrl = 'https://a0.muscache.com/im/pictures/31793105/90dcc361_original.jpg?aki_policy=x_large'

request.get('https://api.imagga.com/v1/tagging?url='+encodeURIComponent(imageUrl), function (error, response, body) 
{
  console.log('Status:', response.statusCode)
  if (response.statusCode == 200)
  {
    // we have data, let's process it
    // console.log('Response:', body)
    console.log(typeof body)

    body = JSON.parse(body)

    console.log(typeof body)

    var imageData = body.results[0]

    console.log(imageData)

    fs.writeFileSync('data/images/test-large.json', JSON.stringify(imageData))
  } 
  else
  {
    // something went wrong
  }
  
}).auth(apiKey, apiSecret, true)