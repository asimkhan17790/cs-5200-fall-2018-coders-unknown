package edu.northeastern.cs5200.hungrycubs.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
import edu.northeastern.cs5200.hungrycubs.dtos.OrderDisplay;
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

	@RequestMapping(value = "/api/restaurant/order/{restaurantKey}/{customerId}/{addressId}/{phoneId}", headers = "Accept=application/json")
	public Order takeOrder(@RequestBody Order order, @PathVariable("restaurantKey") String restaurantKey,
			@PathVariable("customerId") int customerId, @PathVariable("addressId") int addressId,
			@PathVariable("phoneId") int phoneId) {
		Order newOrder = new Order("PREPARING", order.getTotalPrice());

		restDao.addOrderToRestaurant(newOrder, restaurantKey);
		userDao.addOrderToCustomer(newOrder, customerId);
		userDao.addOrderToAddress(newOrder, addressId);
		userDao.addOrderToPhone(newOrder, phoneId);

		List<Item> items = order.getItems();

		for (Item item : items) {
			ordItemDao.assignItemToOrder(item.getId(), newOrder.getId(), item.getQuantity());
		}

		return newOrder;
	}

	@RequestMapping(value = "/api/user/deliveryBoys")
	public List<DeliveryBoy> getDeliveryBoys() {
		return dbDao.findAll().stream().filter(item -> !item.getStatus().equals("BUSY")).collect(Collectors.toList());
	}

	@RequestMapping(value = "/api/user/deliveryBoy/{deliveryBoyId}/{orderId}")
	public Boolean assignDeliveryBoy(@PathVariable("deliveryBoyId") int deliveryBoyId,
			@PathVariable("orderId") int orderId) {

		DeliveryBoy db = dbDao.findById(deliveryBoyId);
		Order order = orderDao.findById(orderId);

		orderDao.addOrderToDeliveryBoy(order, db);

		return true;
	}

	@RequestMapping(value = "/api/user/{managerId}/restaurant/orders/pending")
	public List<Order> getPendingOrdersForManager(@PathVariable("managerId") int managerId) {
		int restaurantId = userDao.getRestaurantIdForManager(managerId);
		return orderDao.getPendingOrdersForRestaurant(restaurantId);
	}

	@RequestMapping(value = "/api/user/{managerId}/restaurant/orders")
	public List<Order> getOrdersForManager(@PathVariable("managerId") int managerId) {
		int restaurantId = userDao.getRestaurantIdForManager(managerId);
		return orderDao.getOrdersForRestaurant(restaurantId);
	}

	@RequestMapping(value = "/api/user/{deliveryBoyId}/order")
	public OrderDisplay getOrderAssignedToDeliveryBoy(@PathVariable("deliveryBoyId") int deliveryBoyId) {
		Integer orderId = orderDao.getOrderAssignedToDeliveryBoy(deliveryBoyId);
		if (orderId == null)
			return new OrderDisplay(0);
		return getOrderDetails(orderId);
	}

	@RequestMapping(value = "/api/restaurant/order/deliver/{orderId}")
	public void orderDelivered(@PathVariable("orderId") int orderId) {
		Order order = orderDao.findById(orderId);
		DeliveryBoy db = dbDao.findById(order.getDeliveryBoy().getId());
		db.setStatus("AVAILABLE");
		order.setOrderStatus("DELIVERED");
		dbDao.createDeliveryBoy(db);
		orderDao.createOrder(order);
	}

	@RequestMapping(value = "/api/restaurant/order/{orderId}")
	public OrderDisplay getOrderDetails(@PathVariable("orderId") int orderId) {
		Order order = orderDao.findById(orderId);
		OrderDisplay orderDisplay = new OrderDisplay(order.getId(), order.getTotalPrice(),
				order.getRestaurant().getName(),
				order.getAddress().getStreetAddress() + ", " + order.getAddress().getCity() + ", "
						+ order.getAddress().getState() + ", " + order.getAddress().getZip(),
				order.getPhone().getPhone(), order.getCustomer().getFirstName(), order.getCustomer().getLastName());
		return orderDisplay;
	}

	@RequestMapping(value = "/api/user/order/{userId}")
	public List<OrderDisplay> getOrdersForCustomer(@PathVariable("userId") int userId) {
		List<Order> orders = orderDao.getOrdersForCustomer(userId);
		List<OrderDisplay> results = new ArrayList<>();
		for (Order order : orders) {
			results.add(getOrderDetails(order.getId()));
		}

		return results;
	}
}
