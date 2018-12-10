export default {
  courses: [],
  authors: [],
  ajaxCallsInProgress: 0,
  dropdowns:{
    managerSignupDropdown:[],
    ownerSignupDropdown:[]
  },
  currentUser:{
    id:0,
    firstName:'',
    lastName:'',
    username:'',
    password:'',
    dType:'CR',
    addresses:[],
    phones:[]
  },
  homePage:{
    searchedRestaurants:[]
  },
  menuPage:{
    currentRestaurant:{},
    menuItems:[],
    order:{
      totalPrice:0,
      restaurantKey:'',
      customerId:0,
      items:[]
    }
  }
};
