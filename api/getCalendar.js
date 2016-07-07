var request = require('request'),
  _ = require('lodash'),
  configs = require('../configs/configs'),
  serialize = require('../helpers/serialize'),
  Promise = require('bluebird')

/**
 * Get calendar for a given hosting ID
 * @param  {[Number/String]} hosting ID         [description]
 * @param  {[Object]} options         [description]
 * @param  {Function} successCallback(err, res, info) - Callback to invoke if successful
 * @param  {Function} failureCallback(err, res) - Callback to invoke if failed
 * @return {Void} - Listing info is passed through callbacks
 *
 * Available options
 * options = {
 *   key: {String}, provide your own API key if you have, otherwise leave this as default
 *   currency: {String}, e.g: 'USD' or 'VND'
 *   locale: {String}, e.g: 'en'
 *   month: {Number/String}, 1-based. E.g: July = 7
 *   year: {Number/String},
 *   count: {Number}, // Get <x> months of availabilities starting at <month>
 * }
 */
function getCalendar(hostingId, options) 
{
  var today = new Date(),
      DEFAULT_AVAILABILITY_PARAMS = _.assign({}, configs.DEFAULT_REQUEST_PARAMS,
      {
        currency: 'EUR',
        locale: 'en',
        month: today.getMonth() + 1,
        year: today.getFullYear(),
        count: 12,
        _format: 'with_conditions'
      })

  return new Promise(function(resolve, reject) 
  {
    // Make sure we have enough params to continue
    if (arguments.length < 2) 
    {
      reject('Must provide listing ID and search options')
    }

    if (!_.isNumber(hostingId) &&
      !_.isString(hostingId)) 
    {
      reject('Listing ID must be string or int')
    }

    var searchOptions = _.assign({
        listing_id: hostingId
      }, DEFAULT_AVAILABILITY_PARAMS, options),
      requestConfigs = _.assign({}, configs.DEFAULT_REQUEST_CONFIGS, {
        url: configs.AVAILABILITY_URL + '?' + serialize(searchOptions)
      })

    console.log(requestConfigs.url)

    // make request
    request(requestConfigs, function(err, res, body) 
    {
      // console.log('getCalendar')
      if (err) 
      {
        console.log('err', err)
        reject(err)
      }
      else
      {
        console.log('getCalendar res', res.statusCode, res.statusMessage)

        if (res.statusCode == 200)
        {
          body = JSON.parse(body)
          resolve(body.calendar_months) 
        }  
        else reject(res)
      }  
    })
  })
}

module.exports = getCalendar