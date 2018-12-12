package edu.northeastern.cs5200.hungrycubs.controllers;

import edu.northeastern.cs5200.hungrycubs.daos.AssignmentDao;
import edu.northeastern.cs5200.hungrycubs.daos.CustomerDao;
import edu.northeastern.cs5200.hungrycubs.daos.DeliveryBoyDao;
import edu.northeastern.cs5200.hungrycubs.daos.ManagerDao;
import edu.northeastern.cs5200.hungrycubs.daos.OrderDao;
import edu.northeastern.cs5200.hungrycubs.daos.OwnerDao;
import edu.northeastern.cs5200.hungrycubs.daos.RestaurantDao;
import edu.northeastern.cs5200.hungrycubs.daos.UserDao;
import edu.northeastern.cs5200.hungrycubs.models.Address;
import edu.northeastern.cs5200.hungrycubs.models.Admin;
import edu.northeastern.cs5200.hungrycubs.models.Customer;
import edu.northeastern.cs5200.hungrycubs.models.CustomerFollowing;
import edu.northeastern.cs5200.hungrycubs.models.DeliveryBoy;
import edu.northeastern.cs5200.hungrycubs.models.Manager;
import edu.northeastern.cs5200.hungrycubs.models.Order;
import edu.northeastern.cs5200.hungrycubs.models.Owner;
import edu.northeastern.cs5200.hungrycubs.models.Phone;
import edu.northeastern.cs5200.hungrycubs.models.Restaurant;
import edu.northeastern.cs5200.hungrycubs.models.Review;
import edu.northeastern.cs5200.hungrycubs.models.User;
import edu.northeastern.cs5200.hungrycubs.repos.AdminRepository;
import edu.northeastern.cs5200.hungrycubs.repos.CustomerFollowingRepository;
import edu.northeastern.cs5200.hungrycubs.repos.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {

	@Autowired
	UserDao userDao;

	@Autowired
	RestaurantDao restDao;

	@Autowired
	ManagerDao managerDao;

	@Autowired
	OwnerDao ownerDao;

	@Autowired
	AssignmentDao assignmentDao;

	@Autowired
	DeliveryBoyDao dbDao;

	@Autowired
	CustomerDao customerDao;

	@Autowired
	OrderDao orderDao;
	@Autowired
	AdminRepository adminRep;
	@Autowired
	CustomerFollowingRepository custFollowRep;
	@Autowired
	ReviewRepository reviewRep;

	private List<User> users = new ArrayList<>();

	@RequestMapping(value = "/api/user/profile/update")
	public User updateProfile(@RequestBody User user) {
		User oldUser = userDao.findById(user.getId());
		if (oldUser.getdType().equals("MGR")) {
			Manager mgr = managerDao.findById(user.getId());
			mgr.setFirstName(user.getFirstName());
			mgr.setLastName(user.getLastName());
			mgr.setPassword(user.getPassword());
			return managerDao.createManager(mgr);
		} else if (oldUser.getdType().equals("OWR")) {
			Owner owr = ownerDao.findById(user.getId());
			owr.setFirstName(user.getFirstName());
			owr.setLastName(user.getLastName());
			owr.setPassword(user.getPassword());
			return ownerDao.createOwner(owr);
		} else if (oldUser.getdType().equals("CR")) {
			Customer cust = customerDao.findById(user.getId());
			cust.setFirstName(user.getFirstName());
			cust.setLastName(user.getLastName());
			cust.setPassword(user.getPassword());
			return customerDao.createCustomer(cust);
		} else if (oldUser.getdType().equals("DLB")) {
			DeliveryBoy db = dbDao.findById(user.getId());
			db.setFirstName(user.getFirstName());
			db.setLastName(user.getLastName());
			db.setPassword(user.getPassword());
			return dbDao.createDeliveryBoy(db);
		} else if (oldUser.getdType().equals("ADM")) {
			Admin db = adminRep.findById(user.getId()).get();
			db.setFirstName(user.getFirstName());
			db.setLastName(user.getLastName());
			db.setPassword(user.getPassword());
			return adminRep.save(db);
		}

		return null;

	}

	@RequestMapping(value = "/api/user")
	public User getCurrentUser(HttpSession session) {
		User user = (User) session.getAttribute("currentUser");
		if (user == null)
			return user;
		user = userDao.findById(user.getId());
		return user;
	}

	@RequestMapping(value = "/api/user/register", headers = "Accept=application/json")
	public User register(@RequestBody User user, HttpSession session) {

		// TODO : Gautam add Db code

		if (userDao.findByUsername(user.getUsername()) != null)
			return user;

		if (user.getdType().equals("MGR")) {
			Manager mgr = new Manager();
			mgr.setId(user.getId());
			mgr.setFirstName(user.getFirstName());
			mgr.setLastName(user.getLastName());
			mgr.setUsername(user.getUsername());
			mgr.setPassword(user.getPassword());
			mgr.setRestaurantKey(user.getRestaurantKey());
			mgr.setdType("MGR");

			managerDao.createManager(mgr);
			user.setId(userDao.findByUsername(user.getUsername()).getId());
			restDao.attachManagerToRestaurant(mgr, restDao.getIdByKey(user.getRestaurantKey()));
		}

		if (user.getdType().equals("OWR")) {
			Owner owner = new Owner();
			owner.setId(user.getId());
			owner.setFirstName(user.getFirstName());
			owner.setLastName(user.getLastName());
			owner.setUsername(user.getUsername());
			owner.setPassword(user.getPassword());
			// owner.setStatus("APPROVAL_PENDING");
			owner.setRestaurantKey(user.getRestaurantKey());
			owner.setdType("OWR");

			ownerDao.createOwner(owner);
			user.setId(userDao.findByUsername(user.getUsername()).getId());
			assignmentDao.assignOwnerToRestaurant(owner, restDao.getIdByKey(user.getRestaurantKey()));

		}

		if (user.getdType().equals("DLB")) {
			DeliveryBoy db = new DeliveryBoy();
			db.setId(user.getId());
			db.setFirstName(user.getFirstName());
			db.setLastName(user.getLastName());
			db.setUsername(user.getUsername());
			db.setPassword(user.getPassword());
			db.setStatus("AVAILABLE");
			db.setdType("DLB");
			dbDao.createDeliveryBoy(db);
			user.setId(userDao.findByUsername(user.getUsername()).getId());
		}

		if (user.getdType().equals("CR")) {
			Customer customer = new Customer();
			customer.setId(user.getId());
			customer.setFirstName(user.getFirstName());
			customer.setLastName(user.getLastName());
			customer.setUsername(user.getUsername());
			customer.setPassword(user.getPassword());
			customer.setdType("CR");
			customerDao.createCustomer(customer);
			user.setId(userDao.findByUsername(user.getUsername()).getId());
		}

		session.setAttribute("currentUser", user);

		users.add(user);
		return user;
	}

	@RequestMapping(value = "/api/user/owner/unassign/{ownerId}/{restaurantId}")
	public Boolean unassignOwnerToRestaurant(@PathVariable("ownerId") int ownerId,
			@PathVariable("restaurantId") int restaurantId) {
		return assignmentDao.unassignOwnerToRestaurant(ownerId, restaurantId);
	}

	@RequestMapping(value = "/api/user/login", method = RequestMethod.POST, headers = "Accept=application/json")
	public User login(@RequestBody User credentials, HttpSession session) {
		for (User user : userDao.findAll()) {
			if (user.getUsername().equals(credentials.getUsername())
					&& user.getPassword().equals(credentials.getPassword())) {
				user = userDao.findByUsername(user.getUsername());
				session.setAttribute("currentUser", user);
				return user;
			}
		}
		credentials.setId(0);
		return credentials;
	}

	@RequestMapping(value = "/api/user/logout")
	public void logout(HttpSession session) {
		session.invalidate();
	}

	@RequestMapping(value = "/api/user/deliveryBoy/order/{deliveryBoyId}")
	public List<Order> getOrderForDeliveryBoy(@PathVariable("deliveryBoyId") int deliveryBoyId) {
		return orderDao.getOrderForDeliveryBoy(deliveryBoyId);
	}

	@RequestMapping(value = "/api/user/{userId}/address/create", headers = "Accept=application/json")
	public User createAddress(@RequestBody Address address, @PathVariable("userId") int userId) {
		userDao.attachAddToUser(userDao.findById(userId), address);

		return userDao.findById(userId);
	}

	@RequestMapping(value = "/api/user/{userId}/address/update", headers = "Accept=application/json")
	public User updateAddress(@RequestBody Address address, @PathVariable("userId") int userId) {
		userDao.updateAddForUser(userDao.findById(userId), address);

		return userDao.findById(userId);
	}

	@RequestMapping(value = "/api/user/{userId}/phone/update", headers = "Accept=application/json")
	public User updatePhone(@RequestBody Phone phone, @PathVariable("userId") int userId) {
		userDao.updatePhoneForUser(userDao.findById(userId), phone);

		return userDao.findById(userId);
	}

	@RequestMapping(value = "/api/user/{userId}/phone/create", headers = "Accept=application/json")
	public User createPhone(@RequestBody Phone phone, @PathVariable("userId") int userId) {
		userDao.attachPhoneToUser(userDao.findById(userId), phone);

		return userDao.findById(userId);
	}

	@RequestMapping(value = "/api/user/{userId}/address/{addressId}/delete", headers = "Accept=application/json")
	public User removeAddress(@PathVariable("addressId") int addressId, @PathVariable("userId") int userId) {
		userDao.removeAddForUser(userDao.findById(userId), addressId);

		return userDao.findById(userId);
	}

	@RequestMapping(value = "/api/user/{userId}/phone/{phoneId}/delete", headers = "Accept=application/json")
	public User removePhone(@PathVariable("phoneId") int phoneId, @PathVariable("userId") int userId) {
		userDao.removePhoneForUser(userDao.findById(userId), phoneId);

		return userDao.findById(userId);
	}

	@RequestMapping(value = "/api/user/restaurants/unmanaged")
	public List<Restaurant> getRestaurantsWithoutManager() {
		List<Restaurant> results = new ArrayList<>();
		List<Integer> restIds = managerDao.getRestaurantIds();
		results = restDao.findAllLazy();

		List<Restaurant> newResult = new ArrayList<>();
		for (Restaurant rest : results)
			if (!restIds.contains(rest.getId()))
				newResult.add(rest);

		return newResult;

	}

	@RequestMapping(value = "/api/user/{managerId}/restaurant")
	public Restaurant getRestaurantForManager(@PathVariable("managerId") int managerId) {
		return restDao.getRestaurantForManager(managerId);
	}

	@RequestMapping(value = "/api/user/details/{userId}")
	public User getUserDetails(@PathVariable("userId") int userId) {
		return userDao.findById(userId);
	}

	@RequestMapping(value = "/api/user/restaurants/unowned/{ownerId}")
	public List<Restaurant> getRestaurantsToOwn(@PathVariable("ownerId") int ownerId) {
		List<Integer> restIds = assignmentDao.getRestaurantIdForOwner(ownerId);
		for (Integer i : restIds) {
			System.out.println(i);
		}
		List<Restaurant> results = new ArrayList<>();
		results = restDao.findAllLazy();
		List<Restaurant> newResult = new ArrayList<>();
		for (Restaurant rest : results)
			if (!restIds.contains(rest.getId()))
				newResult.add(rest);

		return newResult;
	}

	@RequestMapping(value = "/api/user/follow/{followerId}/{followingId}")
	public Boolean followCustomer(@PathVariable("followerId") int followerId,
			@PathVariable("followingId") int followingId) {
		Customer follower = customerDao.findById(followerId);
		Customer following = customerDao.findById(followingId);
		CustomerFollowing custFollowing = new CustomerFollowing();
		custFollowing.setFollower(follower);
		custFollowing.setFollowing(following);
		custFollowRep.save(custFollowing);
		follower.addFollowing(custFollowing);
		following.addFollower(custFollowing);
		return true;
	}

	@RequestMapping(value = "/api/user/unfollow/{followerId}/{followingId}")
	public Boolean unFollowCustomer(@PathVariable("followerId") int followerId,
			@PathVariable("followingId") int followingId) {
		int custFollowingId = custFollowRep.getIdByFollowerAndFollowing(followerId, followingId);
		custFollowRep.deleteById(custFollowingId);
		return true;
	}

	@RequestMapping(value = "/api/user/followings/{userId}")
	public List<Customer> getMyFollowings(@PathVariable("userId") int userId) {
		Customer cust = customerDao.findById(userId);
		List<CustomerFollowing> custFollowing = cust.getFollowings();
		List<Customer> followings = new ArrayList<>();
		for (CustomerFollowing cf : custFollowing) {
			Customer temp = customerDao.findById(cf.getFollowing().getId());
			List<Review> reviews = temp.getReviews();
			for (Review review : reviews) {
				Restaurant tempRest = reviewRep.findById(review.getId()).get().getRestaurant();
				String restaurantName = tempRest.getName();
				String restaurantKey = tempRest.getApiKey();
				review.setRestaurantName(restaurantName);
				review.setRestaurantKey(restaurantKey);
			}
			temp.setReviews(reviews);
			followings.add(temp);
		}

		return followings;
	}

}
