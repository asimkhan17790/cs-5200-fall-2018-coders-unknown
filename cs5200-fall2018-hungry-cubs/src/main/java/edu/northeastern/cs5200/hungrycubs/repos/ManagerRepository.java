package edu.northeastern.cs5200.hungrycubs.repos;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.northeastern.cs5200.hungrycubs.models.Manager;

public interface ManagerRepository extends CrudRepository<Manager, Integer> {
	
	@Query(value="SELECT restaurant_id FROM Manager manager WHERE manager.id=:managerId", nativeQuery=true)
	public int getRestaurantIdForManager(@Param("managerId") int managerId);
	
	@Query(value="SELECT restaurant_id FROM Manager", nativeQuery=true)
	public List<Integer> getRestaurantIds();
	
}
