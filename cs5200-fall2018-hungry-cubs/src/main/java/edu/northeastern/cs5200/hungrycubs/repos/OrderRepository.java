package edu.northeastern.cs5200.hungrycubs.repos;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.northeastern.cs5200.hungrycubs.models.Order;

public interface OrderRepository extends CrudRepository<Order, Integer> {	
	@Query(value="SELECT * FROM FOOD_ORDER WHERE restaurant_id = :restaurantId ORDER BY date DESC", nativeQuery=true)
	public List<Order> getOrdersForRestaurant(@Param("restaurantId") int restaurantId);
	
	
	@Query(value="SELECT * FROM FOOD_ORDER WHERE restaurant_id = :restaurantId AND order_status = 'PREPARING' ORDER BY date DESC", nativeQuery=true)
	public List<Order> getPendingOrdersForRestaurant(@Param("restaurantId") int restaurantId);
	
	
	
	@Query(value="SELECT * FROM FOOD_ORDER WHERE delivery_boy_id = :deliveryBoyId", nativeQuery=true)
	public List<Order> getOrderForDeliveryBoy(@Param("deliveryBoyId") int deliveryBoyId);
	
	@Query(value="SELECT ID FROM FOOD_ORDER WHERE delivery_boy_id = :deliveryBoyId AND order_status = 'IN_TRANSIT'", nativeQuery = true)
	public Integer getOrderAssignedToDeliveryBoy(@Param("deliveryBoyId") int deliveryBoyId);
	
	@Query(value="SELECT * FROM FOOD_ORDER WHERE customer_id = :customerId ORDER BY date DESC", nativeQuery=true)
	public List<Order> getOrdersForCustomer(@Param("customerId") int customerId);
}

