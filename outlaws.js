var async = require('async'),
    readAllListings = require('./_readAllListings'),
    convertArrayToCSV = require('./_convertArrayToCSV'),
    listingsRead = 0,
    listingsReduced = []

var csvOptions = 
{
  fields: 
  [
    {
      name : 'id',
      label : 'id'
    },
    {
      name : 'userId',
      label : 'user id'
    },
    {
      name : 'capacity',
      label : 'capacity (people)'
    },
    {
      name : 'capacity',
      label : 'outlaw (capacity)',
      filter : function (value) 
      {
        return (value > 4) ? 'yes' : 'no'
      }
    }
  ]
}

readAllListings(function(listings)
{
  async.eachSeries(listings, function(listing, nextItem) 
  {
    listingsRead ++ 

    console.log(listingsRead, listing.id)

    var listingReduced = 
    {
      id: listing.id,
      capacity: listing.person_capacity,
      userId: listing.user_id
    }
    
    listingsReduced.push(listingReduced)

    nextItem()
    
    /*getUserInfo(userId, function(res)
    {
      var user = JSON.stringify(res.user)
      
      fs.writeFileSync('data/users/' + userId + '.json', user)
      nextItem()
    })*/
  },
  function(err)
  {
    if (err) console.error(listing.id + ' failed to process')
    else 
    {
      console.log('All listings done', listingsRead)
      convertArrayToCSV(listingsReduced, 'outlaws.csv', csvOptions)
    } 
  })
})