var fs = require('fs'),
    jsonfile = require('jsonfile'),
    dirName = 'data/users/',
    filesCount, filesRead = 0,
    users = []

module.exports = function(callback)
{
  // console.log('_readAllUsers')
  fs.readdir(dirName, function(err, fileNames) 
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

        jsonfile.readFile(dirName + fileName, function(err, user) 
        {
          if (err) 
          {
            console.error(err)
            filesRead ++
          }  
          else
          {
            users.push(user)
            filesRead ++
            // console.log(user.id, user.first_name, filesRead)
            if (filesRead == filesCount) callback(users)
          }        
        })
      })
    }
  })
}