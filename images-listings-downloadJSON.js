var fs = require('fs'),
    async = require('async'),
    request = require('request'),
    readAllListings = require('./_readAllListings'),
    apiKey = 'acc_17e0d94f3c6cd98',
    apiSecret = 'a9d143a2b150ccb858fdc7d14e24b800'


readAllListings(function(listings)
{
  async.eachSeries(listings, function(listing, nextItem) 
  {
    var listingId = listing.id,
        profileUrl = listing.xl_picture_url,
        imaggaUrl = 'https://api.imagga.com/v1/tagging?url='+encodeURIComponent(profileUrl)

    request.get(imaggaUrl, function (error, response, body) 
    {
      console.log(listingId, response.statusCode)
      if (response.statusCode == 200)
      {
        // we have data, let's process it
        // console.log(typeof body)
        body = JSON.parse(body)
        // console.log(typeof body)
        var imageData = body.results[0]
        // console.log(imageData)
        fs.writeFileSync('data/images/listings/' + listingId + '.json', JSON.stringify(imageData))
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
    if (err) console.error(listing.id + ' failed to process')
    else console.log('All listings done')
  })
})