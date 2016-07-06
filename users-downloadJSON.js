var readAllData = require('./_readAllData'),
    convertArrayToCSV = require('./_convertArrayToCSV'),
    getReviews = require('./_geReviews'),
    getUserInfo = require('./_getUserInfo'),
    fs = require('fs'),
    async = require('async')

readAllData(function(listings)
{
  async.eachSeries(listings, function(listing, nextItem) 
  {
    var userId = listing.user_id
    getUserInfo(userId, function(res)
    {
      var user = JSON.stringify(res.user)
      fs.writeFileSync('data/users/' + userId + '.json', user)
      nextItem()
    })
  },
  function(err)
  {
    if( err ) 
    {
      console.error('A listing failed to process')
      // no need to call nextItem() ?!
    } 
    else 
    {
      console.log('All listings have been processed successfully')
    }
  })
})