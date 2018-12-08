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
import edu.northeastern.cs5200.hungrycubs.models.DeliveryBoy;
import edu.northeastern.cs5200.hungrycubs.models.Item;
import edu.northeastern.cs5200.hungrycubs.models.Order;

@RestController
public class OrderController {

	@Autowired
	private OrderDao orderDao;
	@Autowired
	private DeliveryBoyDao dbDao;
	@Autowired
	private OrderItemDao ordItemDao;
	
	   @RequestMapping(value = "/api/user/order", headers = "Accept=application/json")
	    public Order takeOrder(@RequestBody Order order) {
		   List<DeliveryBoy> db = null;
		   
		   if(dbDao.isAvailable())
		   {
			   db = dbDao.getDeliveryBoy();
		   }
		   
		   Order newOrder = new Order("IN_TRANSIT", order.getRestaurantId(), order.getCustomerId(), db.get(0).getId());
		   orderDao.createOrder(newOrder);
		   
		   List<Item> items = order.getItems();
		   
		   for(Item item : items)
		   {
			   ordItemDao.assignItemToOrder(item.getId(), newOrder.getId(), item.getQuantity());
		   }
		   
		   db.get(0).setStatus("BUSY");
		   dbDao.createDeliveryBoy(db.get(0));
		   return newOrder;
	   }
	   
	   @RequestMapping(value="/api/user/order/deliver/{orderId}")
	   public void orderDelivered(@PathVariable("orderId") int orderId)
	   {
		   Order order = orderDao.findById(orderId);
		   DeliveryBoy db = dbDao.findById(order.getDeliveryBoyId());
		   db.setStatus("AVAILABLE");
		   order.setOrderStatus("DELIVERED");
		   dbDao.createDeliveryBoy(db);
		   orderDao.createOrder(order);
	   }
}
