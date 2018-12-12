package edu.northeastern.cs5200.hungrycubs.daos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.hungrycubs.models.OrderItems;
import edu.northeastern.cs5200.hungrycubs.repos.OrderItemRepository;

@Component
public class OrderItemDao {

	@Autowired
	private OrderItemRepository ordItemRep;

	public OrderItems assignItemToOrder(int itemId, int orderId, int quantity) {
		OrderItems orderItem = new OrderItems(itemId, orderId, quantity);
		return ordItemRep.save(orderItem);
	}
}
