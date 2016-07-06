var readAllUsers = require('./_readAllUsers'),
    convertArrayToCSV = require('./_convertArrayToCSV')

var csvOptions = 
{
  fields: 
  [
    {
      name : 'id',
      label : 'user id'
    },
    {
      name : 'first_name',
      label : 'first name'
    },
    {
      name : 'picture_url',
      label : 'picture'
    },
    {
      name : 'listings_count',
      label : 'listings count'
    },
    {
      name : 'acceptance_rate',
      label : 'acceptance rate'
    },
    {
      name : 'created_at',
      label : 'on Airbnb since'
    },
    {
      name : 'is_superhost',
      label : 'superhost?'
    }, 
    {
      name : 'recommendation_count',
      label : 'recommendations count'
    },
    {
      name : 'response_rate',
      label : 'response rate'
    },
    {
      name : 'response_time',
      label : 'response time'
    },
    {
      name : 'reviewee_count',
      label : 'reviewed count'
    },
    {
      name : 'neighborhood',
      label : 'neighborhood'
    },
    {
      name : 'about',
      label : 'about'
    },
    {
      name : 'school',
      label : 'school'
    },
    {
      name : 'work',
      label : 'work'
    }, 
    {
      name : 'friends_count',
      label : 'friends count'
    },
    {
      name : 'is_generated_user',
      label : 'is generated user?'
    }
    

    /*{
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

readAllUsers(function(users)
{
  convertArrayToCSV(users, 'users.csv', csvOptions)
})