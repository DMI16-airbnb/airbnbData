var _ = require('underscore'),
    readAllListings = require('./_readAllListings'),
    convertArrayToCSV = require('./_convertArrayToCSV')

var csvOptions = 
{
  fields: 
  [
    {
      name : 'id',
      label : 'id'
    },
    {
      name : 'xl_picture_url',
      label : 'main picture'
    },
    {
      name : 'user.user.picture_url',
      label : 'user picture'
    },
    {
      name : 'picture_count',
      label : 'picture count'
    }
  ]
}

readAllListings(function(listings)
{
  // trying to get all the pictures
  // but 'picture_urls[' + p + ']' doesn't work
  /*
  var listingWithMostPictures  = _(listings).max(function(listing){ return listing.picture_count}),
      maxPictures = listingWithMostPictures.picture_count

  console.log('maxPictures', maxPictures)

  for(var p=0; p<maxPictures; p++)
  {
    csvOptions.fields.push(
    {
      name : 'picture_urls[' + p + ']',
      label : 'picture ' + (p+1)
    })
  }

  console.log(csvOptions)
  */

  convertArrayToCSV(listings, 'data/listings-pictures.csv', csvOptions)
})