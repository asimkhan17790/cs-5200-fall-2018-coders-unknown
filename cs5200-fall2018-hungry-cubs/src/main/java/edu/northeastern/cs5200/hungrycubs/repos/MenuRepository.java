package edu.northeastern.cs5200.hungrycubs.repos;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.northeastern.cs5200.hungrycubs.models.Menu;

public interface MenuRepository extends CrudRepository<Menu, Integer> {
	
	@Query("SELECT menu FROM Menu menu WHERE restaurant_id=:restaurantId")
	public List<Menu> findByRestaurantId(@Param("restaurantId")int restaurantId);

}
