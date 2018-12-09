export default {
  courses: [],
  authors: [],
  ajaxCallsInProgress: 0,
  currentUser:{
    id:1,
    firstName:'asim',
    lastName:'Khan',
    username:'asim@gmail.com',
    password:'asim@12345',
    dType:'CR',
    addresses:[
      {
        id:1,
        streetAddress:'44 clearway',
        city:'boston',
        state:'NY',
        zip:'94086'
      },
      {
        id:2342,
        streetAddress:'b563 Kareli',
        city:'Allahabad',
        state:'UP',
        zip:'211016'
      },
      {
        id:234,
        streetAddress:'b563 Kareli',
        city:'Allahabad',
        state:'UP',
        zip:'211016'
      },
      {
        id:23,
        streetAddress:'b563 Kareli',
        city:'Allahabad',
        state:'UP',
        zip:'211016'
      },
      {
        id:24,
        streetAddress:'b563 Kareli',
        city:'Allahabad',
        state:'UP',
        zip:'211016'
      },
      {
        id:5,
        streetAddress:'b563 Kareli',
        city:'Allahabad',
        state:'UP',
        zip:'211016'
      }
    ],
    phones:[
      {
        id:1,
        phone:'123456789'
      },
      {
        id:2,
        phone:'9823853082'
      }
    ]
  },
  homePage:{
    searchedRestaurants:[]
  },
  menuPage:{
    menuItems:[],
    order:{
      totalPrice:0,
      restaurantKey:0,
      customerId:0,
      items:[]
    }
  }
};
