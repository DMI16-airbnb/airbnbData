var readAllData = require('./_readAllData'),
    convertArrayToCSV = require('./_convertArrayToCSV')

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

readAllData(function(listings)
{
  convertArrayToCSV(listings, 'listings.csv', csvOptions)
})