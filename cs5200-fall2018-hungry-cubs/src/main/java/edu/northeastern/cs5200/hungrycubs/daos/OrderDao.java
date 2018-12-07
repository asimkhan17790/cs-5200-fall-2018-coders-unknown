package edu.northeastern.cs5200.hungrycubs.daos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.hungrycubs.models.Order;
import edu.northeastern.cs5200.hungrycubs.repos.OrderRepository;

@Component
public class OrderDao {
	
	@Autowired
	private OrderRepository orderRep;
	
	
	public Order createOrder(Order order)
	{
		return orderRep.save(order);
	}
	
	public Order findById(int orderId)
	{
		return orderRep.findById(orderId).get();
	}

}
