var fs = require('fs'),
    es = require('event-stream'),
    jsonfile = require('jsonfile'),
    jsoncsv = require('json-csv'),
    dirName = 'data/',
    filesCount, filesRead = 0,
    listings = []

var csvOptions = 
{
  fields: 
  [
    {
      name : 'city',
      label : 'city'
    }/*,
    {
      name : 'contact.name',
      label : 'Name'
    },
    {
      name : 'contact.email',
      label : 'Email'
    },
    {
      name : 'registration.year',
      label : 'Year'
    },
    {
      name : 'registration.level',
      label : 'Level',
      filter : function(value) 
      {
        switch(value) {
          case 1 : return 'Test 1'
          case 2 : return 'Test 2'
          default : return 'Unknown'
        }
      }
    }*/
  ]
}    

fs.readdir(dirName, function(err, fileNames) 
{
  if (err) console.error(err)
  else
  {
    filesCount = fileNames.length
    console.log('filesCount ' + filesCount)

    fileNames.forEach(function(fileName) 
    {
      // remove .DS_Store
      if (fileName == '.DS_Store') 
      {
        filesRead ++
        return
      }  

      jsonfile.readFile(dirName + fileName, function(err, content) 
      {
        if (err) 
        {
          console.error(err)
          filesRead ++
        }  
        else
        {
          listings.push(content.listing)
          filesRead ++
          console.log(content.listing.id, content.listing.name, filesRead)
          if (filesRead == filesCount) convertArrayToCSV()
        }        
      })
    })
  }
})

function convertArrayToCSV()
{
  console.log('convertArrayToCSV ' + filesRead)
  var output = fs.createWriteStream('output.csv', {encoding: 'utf8'})
  var readable = es.readArray(listings)
  readable.pipe(jsoncsv.csv(csvOptions)).pipe(output)
}




