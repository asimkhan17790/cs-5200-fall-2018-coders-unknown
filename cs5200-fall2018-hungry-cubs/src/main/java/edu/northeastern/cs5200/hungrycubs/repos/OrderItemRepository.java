package edu.northeastern.cs5200.hungrycubs.repos;

import org.springframework.data.repository.CrudRepository;

import edu.northeastern.cs5200.hungrycubs.models.OrderItems;

public interface OrderItemRepository extends CrudRepository<OrderItems, Integer> {

}
