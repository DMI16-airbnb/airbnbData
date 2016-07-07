var airbnb = require('./airbnb'),
    client = new airbnb()

module.exports = function(listingId, options, callback)
{
  // console.log('_getCalendar ' + listingId)
  client.getCalendar(listingId, options).then(function(months) 
  {
    // console.log('_getCalendar success' + listingId, months.length)
    callback(months)
  })
  .catch(function(err)
  {
    console.error('_getCalendar error ' + listingId, err.statusCode)
    callback()
  })
}