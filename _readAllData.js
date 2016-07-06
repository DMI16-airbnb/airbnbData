var fs = require('fs'),
    jsonfile = require('jsonfile'),
    dirName = 'data/',
    filesCount, filesRead = 0,
    listings = []

module.exports = function(callback)
{
  console.log('readAllData')
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
            if (filesRead == filesCount) callback(listings)
          }        
        })
      })
    }
  })
}