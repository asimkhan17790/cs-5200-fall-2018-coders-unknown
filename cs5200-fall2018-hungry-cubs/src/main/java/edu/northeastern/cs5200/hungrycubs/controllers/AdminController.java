package edu.northeastern.cs5200.hungrycubs.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.hungrycubs.daos.AssignmentDao;
import edu.northeastern.cs5200.hungrycubs.daos.CustomerDao;
import edu.northeastern.cs5200.hungrycubs.daos.DeliveryBoyDao;
import edu.northeastern.cs5200.hungrycubs.daos.ManagerDao;
import edu.northeastern.cs5200.hungrycubs.daos.MenuDao;
import edu.northeastern.cs5200.hungrycubs.daos.OwnerDao;
import edu.northeastern.cs5200.hungrycubs.daos.RestaurantDao;
import edu.northeastern.cs5200.hungrycubs.daos.UserDao;
import edu.northeastern.cs5200.hungrycubs.dtos.OwnerRequestDTO;
import edu.northeastern.cs5200.hungrycubs.models.Customer;
import edu.northeastern.cs5200.hungrycubs.models.DeliveryBoy;
import edu.northeastern.cs5200.hungrycubs.models.Item;
import edu.northeastern.cs5200.hungrycubs.models.Manager;
import edu.northeastern.cs5200.hungrycubs.models.Menu;
import edu.northeastern.cs5200.hungrycubs.models.Owner;
import edu.northeastern.cs5200.hungrycubs.models.User;
import edu.northeastern.cs5200.hungrycubs.repos.ItemRepository;

@RestController
public class AdminController {

	@Autowired
	private UserDao userDao;
	@Autowired
	private ManagerDao managerDao;
	@Autowired
	private RestaurantDao restDao;
	@Autowired
	private AssignmentDao assignmentDao;
	@Autowired
	private DeliveryBoyDao dbDao;
	@Autowired
	private OwnerDao ownerDao;
	@Autowired
	private CustomerDao customerDao;
	@Autowired
	private MenuDao menuDao;
	@Autowired
	private ItemRepository itemRep;

	@GetMapping("/api/admin/users")
	public List<User> getUsers() {
		List<User> u = userDao.getUsers();
		return u.stream().filter(item -> !item.getdType().equals("ADM")).collect(Collectors.toList());
	}

	@GetMapping("/api/admin/approvals/pending")
	public List<OwnerRequestDTO> getPendingOwners() {
		return userDao.getPendingOwners();
	}

	@GetMapping("/api/admin/user/create")
	public User createUser(@RequestBody User user) {
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

		return user;

	}

	@GetMapping("/api/admin/user/delete/{userId}")
	public Boolean deleteUser(@PathVariable("userId") int userId) {
		User user = userDao.findById(userId);

		if (user.getdType().equals("MGR")) {
			managerDao.deleteById(userId);
		}

		if (user.getdType().equals("OWR")) {
			ownerDao.deleteById(userId);
		}

		if (user.getdType().equals("DLB")) {
			dbDao.deleteById(userId);
		}

		if (user.getdType().equals("CR")) {
			customerDao.deleteById(userId);
		}
		return true;
	}

	@GetMapping("/api/admin/approval/approve/{ownerId}/{restaurantKey}")
	public Boolean approveOwnerStatus(@PathVariable("ownerId") int ownerId,
			@PathVariable("restaurantKey") String restaurantKey) {
		int restaurantId = restDao.getIdByKey(restaurantKey);
		userDao.updateOwnerStatus(ownerId, "APPROVED", restaurantId);
		return true;
	}

	@GetMapping("/api/admin/approval/reject/{ownerId}/{restaurantKey}")
	public Boolean rejectOwnerStatus(@PathVariable("ownerId") int ownerId,
			@PathVariable("restaurantKey") String restaurantKey) {
		int restaurantId = restDao.getIdByKey(restaurantKey);
		userDao.updateOwnerStatus(ownerId, "REJECTED", restaurantId);
		return true;
	}

	@GetMapping("/api/admin/restaurant/delete/{restaurantKey}")

	public Boolean deleteRestaurant(@PathVariable("restaurantKey") String restaurantKey) {
		int restaurantId = restDao.getIdByKey(restaurantKey);
		restDao.deleteById(restaurantId);
		return true;
	}
	
	@PostMapping("/api/admin/item/create/{menuId}")
	public Boolean createItemForMenu(@RequestBody Item item,@PathVariable("menuId") int menuId)
	{


		Menu menu = menuDao.findById(menuId);
		menuDao.attachItemToMenu(menu, item);
		return true;
	}

	
	@PostMapping("/api/admin/item/update")
	public Boolean updateItem(@RequestBody Item item)
	{

		Item oldItem = itemRep.findById(item.getId()).get();
		item.setMenu(oldItem.getMenu());
		itemRep.save(item);
		return true;
	}

	@GetMapping("/api/admin/item/delete/{itemId}")
	public Boolean deleteItem(@PathVariable("itemId") int itemId) {
		itemRep.deleteById(itemId);
		return true;
	}

}
