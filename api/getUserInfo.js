var request = require('request'),
  _ = require('lodash'),
  configs = require('../configs/configs'),
  serialize = require('../helpers/serialize'),
  Promise = require('bluebird')


/**
 * Get info for a particular user
 * @param  {Number, String} userId
 * @param  {Function} successCallback - Success callback to invoke
 * @param  {Function} failureCallback - Failure callback to invoke
 * @return {Void} - User info is passed onto callbacks
 */
function getUserInfo(userId) 
{
	var params = configs.DEFAULT_REQUEST_PARAMS
			params._format = 'v1_legacy_show'

  var requestConfigs = _.assign({}, configs.DEFAULT_REQUEST_CONFIGS, 
  {
    url: configs.USER_URL + '/' + userId + '?' + serialize(params)
  })

  return new Promise(function(resolve, reject) {
    // Make request to parse hosting info
    request(requestConfigs, function(err, res, body) {
      if (!err && res.statusCode == 200) {
        resolve(JSON.parse(body))
      } else if (err) {
        reject(err)
      }
    })
  })
}

module.exports = getUserInfo
