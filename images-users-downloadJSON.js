var fs = require('fs'),
    async = require('async'),
    request = require('request'),
    readAllUsers = require('./_readAllUsers'),
    apiKey = 'acc_b4714fa3a1cc37e',
    apiSecret = '19ad71900f3c596e8b9cae5369071ba0'


readAllUsers(function(users)
{
  async.eachSeries(users, function(user, nextItem) 
  {
    var userId = user.id,
        profileUrl = user.picture_large_url,
        imaggaUrl = 'https://api.imagga.com/v1/tagging?url='+encodeURIComponent(profileUrl)

    request.get(imaggaUrl, function (error, response, body) 
    {
      console.log(userId, response.statusCode)
      if (response.statusCode == 200)
      {
        // we have data, let's process it
        // console.log(typeof body)
        body = JSON.parse(body)
        // console.log(typeof body)
        var imageData = body.results[0]
        // console.log(imageData)
        fs.writeFileSync('data/images/users/' + userId + '.json', JSON.stringify(imageData))
        nextItem()
      } 
      else
      {
        // something went wrong
        console.log('something went wrong', response.statusCode, response.statusMessage)
        nextItem()
      }
    }).auth(apiKey, apiSecret, true)
  },
  function(err)
  {
    if (err) console.error(user.id + ' failed to process')
    else console.log('All users done')
  })
})