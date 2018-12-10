package edu.northeastern.cs5200.hungrycubs.daos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.hungrycubs.models.DeliveryBoy;
import edu.northeastern.cs5200.hungrycubs.models.Order;
import edu.northeastern.cs5200.hungrycubs.repos.DeliveryBoyRepository;
import edu.northeastern.cs5200.hungrycubs.repos.OrderRepository;

@Component
public class OrderDao {
	
	@Autowired
	private OrderRepository orderRep;
	
	@Autowired
	private DeliveryBoyRepository dbRep;
	
	public Order createOrder(Order order)
	{
		return orderRep.save(order);
	}
	
	public Order findById(int orderId)
	{
		return orderRep.findById(orderId).get();
	}

	public List<Order> getOrdersForRestaurant(int restaurantId)
	{
		return orderRep.getOrdersForRestaurant(restaurantId);
	}
	
	public List<Order> getPendingOrdersForRestaurant(int restaurantId)
	{
		return orderRep.getPendingOrdersForRestaurant(restaurantId);
	}
	
	public List<Order> getOrderForDeliveryBoy(int deliveryBoyId)
	{
		return orderRep.getOrderForDeliveryBoy(deliveryBoyId);
	}
	
	public void addOrderToDeliveryBoy(Order order, DeliveryBoy db)
	{
		orderRep.save(order);
		db.setStatus("BUSY");
		db.addOrder(order);
		dbRep.save(db);
		order.setDeliveryBoy(db);
		order.setOrderStatus("IN_TRANSIT");
		orderRep.save(order);
	}
}
