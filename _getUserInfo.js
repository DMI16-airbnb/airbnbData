var airbnb = require('./airbnb'),
    client = new airbnb()

module.exports = function(userId, callback)
{
  console.log('getUserInfo ' + userId)
  // console.log(client)
  client.getUserInfo(userId)
  .then(function(res) 
  {
    // console.log(res)
    callback(res)
    // console.log('loggedin', client)
  })
  .catch(function(err)
  {
    console.error(err)
  })
}