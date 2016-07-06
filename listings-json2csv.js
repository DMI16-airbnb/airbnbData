var fs = require('fs'),
    es = require('event-stream'),
    jsonfile = require('jsonfile'),
    jsoncsv = require('json-csv'),
    dirName = 'data/',
    outputName = 'output.csv',
    filesCount, filesRead = 0,
    listings = []

var csvOptions = 
{
  fields: 
  [
    {
      name : 'id',
      label : 'id'
    },
    {
      name : 'name',
      label : 'name'
    },
    {
      name : 'lat',
      label : 'lat'
    },
    {
      name : 'lng',
      label : 'lng'
    },
    {
      name : 'price_native',
      label : 'price €'
    },
    {
      name : 'bedrooms',
      label : 'bedrooms'
    },
    {
      name : 'beds',
      label : 'beds'
    },
    {
      name : 'person_capacity',
      label : 'person capacity'
    },
    {
      name : 'room_type',
      label : 'room type'
    },
    {
      name : 'property_type',
      label : 'property type'
    },
    {
      name : 'reviews_count',
      label : 'reviews'
    },
    {
      name : 'star_rating',
      label : 'star rating'
    }, 
    {
      name : 'user_id',
      label : 'user_id'
    },
    {
      name : 'user.user.reviewee_count',
      label : 'user reviewed count'
    },
    {
      name : 'picture_count',
      label : 'picture count'
    },
    {
      name : 'neighborhood',
      label : 'neighborhood'
    },
    {
      name : 'city',
      label : 'city'
    },
    {
      name : 'house_rules',
      label : 'house rules'
    },
    {
      name : 'summary',
      label : 'summary'
    },
    {
      name : 'description',
      label : 'description'
    },
    {
      name : 'space',
      label : 'space'
    },
    {
      name : 'transit',
      label : 'transit'
    }

    /*
    {
      name : '',
      label : ''
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
  var output = fs.createWriteStream(outputName, {encoding: 'utf8'})
  var readable = es.readArray(listings)
  readable.pipe(jsoncsv.csv(csvOptions)).pipe(output)
}




