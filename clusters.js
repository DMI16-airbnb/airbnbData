var _ = require('underscore'),
    readAllListings = require('./_readAllListings'),
    readAllUsers = require('./_readAllUsers'),
    convertArrayToCSV = require('./_convertArrayToCSV')

var csvOptions = 
{
  fields: 
  [
    {
      name : 'listing',
      label : 'listing id'
    },
    {
      name : 'user',
      label : 'user id'
    },
    {
      name : 'lat',
      label : 'listing latitude'
    },
    {
      name : 'lon',
      label : 'listing longitude'
    },
    {
      name : 'listingsCount',
      label : 'user listing count'
    },
    {
      name : 'userSuperHost',
      label : 'is superhost?'
    },
    {
      name : 'userLocation',
      label : 'user declared location'
    }
  ]
}

var clusters = []

readAllListings(function(listings)
{
  readAllUsers(function(users)
  {
    listings.forEach(function(listing)
    {
      var listingId = listing.id,
          userId = listing.user.user.id
      var cluster = 
      {
        listing: listingId,
        user: userId,
        lat: listing.lat,
        lon: listing.lng
      }

      var user = _(users).find(function(user){ return user.id == userId })

      // console.log('user', user)

      if (user)
      {
        cluster.listingsCount = user.listings_count
        cluster.userLocation = user.location
        cluster.userSuperHost = user.is_superhost
      }

      clusters.push(cluster)
    })

    // console.log(clusters)

    convertArrayToCSV(clusters, 'data/clusters.csv', csvOptions)
  })
})