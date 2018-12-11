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
      id:1,
      firstName:'Asim',
      lastName:'Khan',
      address:'44 clearway street',
      phone:'123123213',
      orderStatus:'in Transit',
      totalPrice:'55'
    },
    allUsers:[],
    allApprovals:[],
    allRestaurants:[],
    userSelected:{
      id:0,
      firstName:'',
      lastName:'',
      username:'',
      password:'',
      dType:'CR',
      addresses:[],
      phones:[]
    }
  },
  menuPage:{
    currentRestaurant:{ id:0},
    menuItems:[],
    order:{
      totalPrice:0,
      restaurantKey:'',
      customerId:0,
      items:[]
    }
  }
};
