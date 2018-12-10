package edu.northeastern.cs5200.hungrycubs.daos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.hungrycubs.models.Address;
import edu.northeastern.cs5200.hungrycubs.models.Manager;
import edu.northeastern.cs5200.hungrycubs.models.Order;
import edu.northeastern.cs5200.hungrycubs.models.Phone;
import edu.northeastern.cs5200.hungrycubs.models.Restaurant;
import edu.northeastern.cs5200.hungrycubs.repos.AddressRepository;
import edu.northeastern.cs5200.hungrycubs.repos.PhoneRepository;
import edu.northeastern.cs5200.hungrycubs.repos.RestaurantRepository;

@Component
public class RestaurantDao {
	
	@Autowired
	private RestaurantRepository restRep;
	@Autowired
	private AddressRepository addRep;
	@Autowired
	private PhoneRepository phoneRep;
	@Autowired
	private ManagerDao managerDao;
	@Autowired
	private OrderDao orderDao;
	
	public Restaurant createRestaurant(Restaurant restaurant)
	{
		return restRep.save(restaurant);
	}
	
	public void attachAddToRest(Restaurant restaurant, Address address)
	{
		restaurant.addAddress(address);
		address.setRestaurant(restaurant);
		addRep.save(address);
		restRep.save(restaurant);
	}
	
	public void attachPhoneToRest(Restaurant restaurant, Phone phone)
	{
		restaurant.addPhone(phone);
		phone.setRestaurant(restaurant);
		phoneRep.save(phone);
		restRep.save(restaurant);
	}
	
	public List<Restaurant> findAll()
	{
		return (List<Restaurant>)restRep.findAll();
	}
	
	public List<Restaurant> findAllLazy()
	{
		List<Restaurant> restaurants =  restRep.findAllLazy();
		for(Restaurant rest: restaurants)
		{
			rest.setAddresses(null);
			rest.setPhones(null);
			rest.setMenus(null);
			rest.setOrders(null);
			rest.setAssignments(null);
			rest.setManager(null);
			
			
		}
		return restaurants;
	}
	
	public void attachManagerToRestaurant(Manager manager, int restaurantId)
	{
		
		Restaurant restaurant = restRep.findById(restaurantId).get();
		restaurant.setManager(manager);
		manager.setRestaurant(restaurant);
		managerDao.createManager(manager);
		restRep.save(restaurant);
	}
	
	public void addOrderToRestaurant(Order newOrder, String restaurantKey)
	{
		int restaurantId = restRep.getIdByKey(restaurantKey);
		Restaurant restaurant = restRep.findById(restaurantId).get();
		newOrder.setRestaurant(restaurant);
		restaurant.addOrder(newOrder);
		orderDao.createOrder(newOrder);
		restRep.save(restaurant);
	}
	
	public int getIdByKey(String apiKey)
	{
		return restRep.getIdByKey(apiKey);
	}
	
	public Restaurant findById(int restaurantId)
	{
		return restRep.findById(restaurantId).get();
	}
	
	public List<Integer> getRestaurantIdForOwner(int ownerId)
	{
		return restRep.getRestaurantIdForOwner(ownerId);
	}
	
	public Restaurant getRestaurantForManager(int managerId)
	{
		int restaurantId = managerDao.getRestaurantId(managerId);
		return restRep.findById(restaurantId).get();
	}
}
