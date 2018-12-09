package edu.northeastern.cs5200.hungrycubs.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.hungrycubs.daos.DeliveryBoyDao;
import edu.northeastern.cs5200.hungrycubs.daos.OrderDao;
import edu.northeastern.cs5200.hungrycubs.daos.OrderItemDao;
import edu.northeastern.cs5200.hungrycubs.daos.RestaurantDao;
import edu.northeastern.cs5200.hungrycubs.daos.UserDao;
import edu.northeastern.cs5200.hungrycubs.models.DeliveryBoy;
import edu.northeastern.cs5200.hungrycubs.models.Item;
import edu.northeastern.cs5200.hungrycubs.models.Order;

@RestController
public class OrderController {

	@Autowired
	private UserDao userDao;
	@Autowired
	private OrderDao orderDao;
	@Autowired
	private DeliveryBoyDao dbDao;
	@Autowired
	private OrderItemDao ordItemDao;
	@Autowired
	private RestaurantDao restDao;
	
	   @RequestMapping(value = "/api/restaurant/order/{restaurantId}/{customerId}/{addressId}/{phoneId}", headers = "Accept=application/json")
	    public Order takeOrder(@RequestBody Order order, @PathVariable("restaurantId") int restaurantId, @PathVariable("customerId") int customerId, 
	    						@PathVariable("addressId") int addressId, @PathVariable("phoneId") int phoneId) {
//		   List<DeliveryBoy> db = null;
//		   
//		   if(dbDao.isAvailable())
//		   {
//			   db = dbDao.getDeliveryBoy();
//		   }
		   
		   Order newOrder = new Order("PREPARING", order.getTotalPrice());
		   restDao.addOrderToRestaurant(newOrder, restaurantId);
		   userDao.addOrderToCustomer(newOrder, customerId);
		   userDao.addOrderToAddress(newOrder, addressId);
		   userDao.addOrderToPhone(newOrder, phoneId);
		   
		   List<Item> items = order.getItems();
		   
		   for(Item item : items)
		   {
			   ordItemDao.assignItemToOrder(item.getId(), newOrder.getId(), item.getQuantity());
		   }
		   
//		   db.get(0).setStatus("BUSY");
//		   dbDao.createDeliveryBoy(db.get(0));
		   return newOrder;
	   }
	   
	   @RequestMapping(value="/api/user/deliveryBoys")
	   public List<DeliveryBoy> getDeliveryBoys()
	   {
		   return dbDao.findAll();
	   }
	   
	   @RequestMapping(value="/api/user/deliveryBoy/{deliveryBoyId}/{orderId}")
	   public Boolean assignDeliveryBoy(@PathVariable("deliveryBoyId") int deliveryBoyId, @PathVariable("orderId") int orderId)
	   {
		   
		   DeliveryBoy db = dbDao.findById(deliveryBoyId);
		   Order order = orderDao.findById(orderId);
		   
		   orderDao.addOrderToDeliveryBoy(order, db);

		   return true;
	   }
	   
	   @RequestMapping(value="/api/restaurant/order/{managerId}")
	   public List<Order> getOrdersForManager(@PathVariable("managerId") int managerId)
	   {
		   int restaurantId = userDao.getRestaurantIdForManager(managerId); 
		   return orderDao.getOrdersForRestaurant(restaurantId);
	   }
   
	   @RequestMapping(value="/api/restaurant/order/deliver/{orderId}")
	   public void orderDelivered(@PathVariable("orderId") int orderId)
	   {
		   Order order = orderDao.findById(orderId);
		   DeliveryBoy db = dbDao.findById(order.getDeliveryBoy().getId());
		   db.setStatus("AVAILABLE");
		   order.setOrderStatus("DELIVERED");
		   dbDao.createDeliveryBoy(db);
		   orderDao.createOrder(order);
	   }
}
