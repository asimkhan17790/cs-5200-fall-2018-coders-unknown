package edu.northeastern.cs5200.hungrycubs.repos;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.northeastern.cs5200.hungrycubs.models.Assignment;

public interface AssignmentRepository extends CrudRepository<Assignment, Integer> {

	@Query(value="SELECT restaurant_id FROM assignment WHERE owner_id = :ownerId AND restaurant_id = :restaurantId", nativeQuery= true)
	public int getIdForOwnerRestaurant(@Param("ownerId") int ownerId,@Param("restaurantId") int restaurantId);
	
	@Query(value="SELECT id FROM assignment WHERE owner_id = :ownerId AND restaurant_id = :restaurantId", nativeQuery= true)
	public int findAssignmentIdByOwnerAndRestaurant(@Param("ownerId")int ownerId,@Param("restaurantId") int restaurantId);
	
	@Query(value="SELECT * FROM assignment WHERE status='APPROVAL_PENDING'", nativeQuery=true)
	public List<Assignment> findIdForPendingAssignment();
	
	@Query(value="SELECT restaurant_id FROM assignment WHERE owner_id = :ownerId", nativeQuery=true)
	public List<Integer> getRestaurantIdForOwner(@Param("ownerId") int ownerId);
}
