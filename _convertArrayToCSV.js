var fs = require('fs'),
    es = require('event-stream'),
    jsoncsv = require('json-csv')

module.exports = function (inputArray, outputName, options)
{
  console.log('convertArrayToCSV ' + inputArray.length)
  var output = fs.createWriteStream(outputName, {encoding: 'utf8'})
  var readable = es.readArray(inputArray)
  readable.pipe(jsoncsv.csv(options))
          .pipe(output)
}