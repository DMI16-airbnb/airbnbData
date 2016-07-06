var readAllListings = require('./_readAllListings'),
    getUserInfo = require('./_getUserInfo'),
    fs = require('fs'),
    async = require('async'),
    listingsRead = 0

readAllListings(function(listings)
{
  async.eachSeries(listings, function(listing, nextItem) 
  {
    var userId = listing.user_id
    listingsRead ++ 

    console.log(listingsRead, listing.id, userId)
    
    getUserInfo(userId, function(res)
    {
      var user = JSON.stringify(res.user)

      fs.writeFileSync('data/users/' + userId + '.json', user)
      nextItem()
    })
  },
  function(err)
  {
    if (err) console.error(listing.id + ' failed to process')
    else console.log('All listings done', listingsRead)
  })
})