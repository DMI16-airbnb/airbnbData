var _ = require('underscore'),
    readAllFiles = require('./_readAllFiles'),
    convertArrayToCSV = require('./_convertArrayToCSV')

var csvOptions = 
{
  fields: 
  [
    {
      name : 'id',
      label : 'listing id'
    },
    {
      name : 'userId',
      label : 'user id'
    },
    {
      name : 'lat',
      label : 'listing latitude'
    },
    {
      name : 'lon',
      label : 'listing longitude'
    },
    {
      name : 'price',
      label : 'price'
    },
    {
      name : 'discomfortIndex',
      label : 'discomfort index'
    },
    {
      name : 'tags',
      label : 'most confident tags'
    },
    {
      name : 'indoorOutdoor',
      label : 'indoors / outdoors'
    },
    {
      name : 'pictureUrl',
      label : 'picture url'
    }
  ]
}

var listingProfiles = []

readAllFiles('data/listings/', function(listingFiles)
{
  console.log('readAllFiles data/listings/')

  readAllFiles('data/images/listings/', function(imageFiles)
  {
    console.log('readAllFiles data/images/listings/')

    listingFiles.forEach(function(listingFile)
    {
      listing = listingFile.listing
      
      if (!listing) return

      // console.log(listing)

      var listingProfile = 
      {
        id: listing.id,
        userId: listing.user_id,
        lat: listing.lat,
        lon: listing.lng,
        price: listing.price_native,
        pictureUrl: listing.xl_picture_url,
        discomfortIndex: getDiscomfortIndex(listing)
      }

      // console.log(listingProfile)

      var image = _(imageFiles).find(function(imageFile){ return imageFile.image == listingProfile.pictureUrl })

      if (image)
      {
        // console.log(image.image)
        listingProfile.tags = getTags(image)
        listingProfile.indoorOutdoor = getIndoorOutdoor(image)
      }

      listingProfiles.push(listingProfile)
    })

    // console.log(listingProfiles)

    convertArrayToCSV(listingProfiles, 'data/listingProfiles.csv', csvOptions)
  }) 
})

function getTags(image)
{
  // console.log(image)
  var allTags = image.tags,
      topTags = []
  for (var t=0; t<10; t++)
  {
    var tag = allTags[t]
    if (tag) topTags.push(tag.tag)
  }
  return topTags.join(',')
}

function getIndoorOutdoor(image)
{
  // console.log('\ngetIndoorOutdoor')
  var indoorOutdoor = 'neither' // default
  
  // loop through all tags and stop as soon as we find 'indoor', 'interior' or 'outdoor'
  image.tags.some(function(tag)
  {
    var tag = tag.tag 
    // console.log(tag)
    
    if (tag.indexOf('indoor') > -1 || tag.indexOf('interior') > -1)
    {
      indoorOutdoor = 'indoor'
      return true // exits the loop
    } 
    if (tag.indexOf('outdoor') > -1) 
    {
      indoorOutdoor = 'outdoor'
      return true // exits the loop
    } 
  })

  return indoorOutdoor
}

function getDiscomfortIndex(listing)
{
  var maxPeople = listing.person_capacity,
      bedrooms = listing.bedrooms,
      beds = listing.beds,
      bedType = listing.bed_type_category,
      bedTypeDiscomfortIndex = 0 // real_bed

  switch (bedType)
  {
    case 'pull_out_sofa':
    case 'futon':
      bedTypeDiscomfortIndex = 0.25
      break
    case 'couch':
      bedTypeDiscomfortIndex = 0.5
      break
    case 'airbed':
      bedTypeDiscomfortIndex = 0.75
      break    
  }

  var discomfortIndex = (maxPeople - beds - bedTypeDiscomfortIndex) / bedrooms
  return discomfortIndex
}