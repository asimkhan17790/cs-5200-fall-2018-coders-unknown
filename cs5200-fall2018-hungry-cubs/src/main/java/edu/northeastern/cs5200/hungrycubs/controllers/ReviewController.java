package edu.northeastern.cs5200.hungrycubs.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import edu.northeastern.cs5200.hungrycubs.daos.CustomerDao;
import edu.northeastern.cs5200.hungrycubs.daos.RestaurantDao;
import edu.northeastern.cs5200.hungrycubs.daos.UserDao;
import edu.northeastern.cs5200.hungrycubs.models.Customer;
import edu.northeastern.cs5200.hungrycubs.models.Restaurant;
import edu.northeastern.cs5200.hungrycubs.models.Review;
import edu.northeastern.cs5200.hungrycubs.models.User;
import edu.northeastern.cs5200.hungrycubs.repos.ReviewRepository;

@RestController
public class ReviewController {

	@Autowired
	private UserDao userDao;
	@Autowired
	private CustomerDao custDao;
	@Autowired
	private RestaurantDao restDao;
	@Autowired
	private ReviewRepository reviewRep;


	// Get All reviews by customer
	@RequestMapping(value = "/api/user/reviews/{userId}")
	public List<Review> getReviewsByUser(@PathVariable("userId") int userId) {
		User user = userDao.findById(userId);
		List<Review> reviews = reviewRep.getReviewsForUser(userId);
		for (Review review : reviews) {
			Restaurant rest = restDao.findById(review.getRestaurant().getId());
			review.setFirstName(user.getFirstName());
			review.setLastName(user.getLastName());
			review.setRestaurantKey(rest.getApiKey());
			review.setRestaurantName(rest.getName());
			review.setUserId(userId);
		}
		return reviews;
	}

	// Get All reviews for Restaurant
	@RequestMapping(value = "/api/restaurant/reviews/{restaurantKey}")
	public List<Review> getReviewsForRestaurant(@PathVariable("restaurantKey") String restaurantKey) {
		int restaurantId = restDao.getIdByKey(restaurantKey);
		Restaurant rest = restDao.findById(restaurantId);
		List<Review> reviews = reviewRep.getReviewsForRestaurant(restaurantId);
		for (Review review : reviews) {
			Customer cust = custDao.findById(review.getCustomer().getId());
			review.setFirstName(cust.getFirstName());
			review.setLastName(cust.getLastName());
			review.setRestaurantKey(rest.getApiKey());
			review.setRestaurantName(rest.getName());
			review.setUserId(cust.getId());
		}
		return reviews;
	}

	// Add Review
	@RequestMapping(value = "/api/restaurant/review/{customerId}/{restaurantKey}")
	public Boolean createReview(@RequestBody Review review, @PathVariable("customerId") int customerId,
			@PathVariable("restaurantKey") String restaurantKey) {
		restDao.addReviewToRestaurant(review, restaurantKey);
		userDao.addReviewToCustomer(review, customerId);
		return true;
	}

}
