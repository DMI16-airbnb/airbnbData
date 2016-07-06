/**
 * airbnb Node wrapper for unofficial API
 * @author Si Pham <phamtrisi@gmail.com> + Matteo Menapace <m@tteo.me>
 *
 * Support basic actions to interact with airbnb hostings
 * - search() - Search for hostings given conditions
 * - getInfo() - Get info about a hosting
 * - getUserInfo - Get info about a user
 * - getCalendar() - Get availability for a hosting
 * - getEstIncome() - Get estimate income a hosting generates, by month
 * - getReviews() - Get reviews for a given user, as host or guest
 */

var search = require('./api/search'),
    getInfo = require('./api/getInfo'),
    getUserInfo = require('./api/getUserInfo'),
    getCalendar = require('./api/getCalendar'),
    getReviews = require('./api/getReviews'),
    getEstIncome = require('./api/getEstIncome'),
    login = require('./api/login')

module.exports = function(optionalConfigs) 
{
  optionalConfigs = optionalConfigs || {}

  var client = 
  {
    configs: optionalConfigs,
    // search: search,
    // getInfo: getInfo,
    getUserInfo: getUserInfo,
    // getCalendar: getCalendar,
    // getReviews: getReviews,
    // getEstIncome: getEstIncome,
    // login: login
  }

  return client
}

// TODO some functions may not work yet