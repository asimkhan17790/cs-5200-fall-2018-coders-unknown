package edu.northeastern.cs5200.hungrycubs.repos;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import edu.northeastern.cs5200.hungrycubs.models.Assignment;

public interface AssignmentRepository extends CrudRepository<Assignment, Integer> {

	@Query(value="SELECT restaurant_id FROM Assignment WHERE owner_id = :ownerId AND restaurant_id = :restaurantId", nativeQuery= true)
	public int getIdForOwnerRestaurant(int ownerId, int restaurantId);
}
