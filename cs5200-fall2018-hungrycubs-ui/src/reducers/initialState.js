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
    searchedRestaurants:[],
    pendingManagerOrders:[],
    allManagerOrders:[],
    deliveryBoysList:[],
    restaurantDetails:{id:0},
    customerOrderItemDetails:{},
    allDeliveryBoyOrders:[],
    myAssignedOrder:{
      id:0
    }

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
