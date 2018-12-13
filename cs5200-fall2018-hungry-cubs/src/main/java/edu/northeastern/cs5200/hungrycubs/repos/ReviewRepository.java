package edu.northeastern.cs5200.hungrycubs.repos;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.northeastern.cs5200.hungrycubs.models.Review;

public interface ReviewRepository extends CrudRepository<Review, Integer> {

	
	@Query(value = "SELECT * FROM review WHERE customer_id = :userId order by timestamp desc", nativeQuery = true)
	public List<Review> getReviewsForUser(@Param("userId") int userId);
	
	@Query(value = "SELECT * FROM review WHERE restaurant_id = :restaurantId order by timestamp desc", nativeQuery = true)
	public List<Review> getReviewsForRestaurant(@Param("restaurantId") int restaurantId);
	
}
