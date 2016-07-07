var fs = require('fs'),
    jsonfile = require('jsonfile'),
    filesCount, filesRead,
    jsons = []

module.exports = function(dirPath, callback)
{
  // console.log('_readAllFiles ' + dirPath)
  filesRead = 0 // reset the count

  fs.readdir(dirPath, function(err, fileNames) 
  {
    if (err) console.error(err)
    else
    {
      filesCount = fileNames.length
      // console.log('filesCount ' + filesCount)

      fileNames.forEach(function(fileName) 
      {
        // remove .DS_Store
        if (fileName == '.DS_Store') 
        {
          filesRead ++
          return
        }  

        jsonfile.readFile(dirPath + fileName, function(err, json) 
        {
          if (err) 
          {
            console.error(err)
            filesRead ++
          }  
          else
          {
            jsons.push(json)
            filesRead ++
            if (filesRead == filesCount) callback(jsons)
          }        
        })
      })
    }
  })
}