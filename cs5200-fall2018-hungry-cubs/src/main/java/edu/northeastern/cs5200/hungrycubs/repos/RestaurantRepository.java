package edu.northeastern.cs5200.hungrycubs.repos;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.northeastern.cs5200.hungrycubs.models.Restaurant;

public interface RestaurantRepository extends CrudRepository<Restaurant, Integer> {
	
	@Query("SELECT id FROM Restaurant WHERE apiKey = :apiKey")
	public int getIdByKey(@Param("apiKey") String apiKey);
	
	@Query(value = "SELECT restaurant_id FROM Assignment WHERE owner_id = :ownerId", nativeQuery = true)
	public List<Integer> getRestaurantIdForOwner(@Param("ownerId") int ownerId);
	
	@Query(value = "SELECT restaurant FROM Restaurant restaurant")
	public List<Restaurant> findAllLazy();
}
