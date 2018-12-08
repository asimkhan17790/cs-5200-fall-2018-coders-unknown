package edu.northeastern.cs5200.hungrycubs.daos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.hungrycubs.models.Address;
import edu.northeastern.cs5200.hungrycubs.models.Manager;
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
	
	public void attachManagerToRestaurant(Manager manager, int restaurantId)
	{
		Restaurant restaurant = restRep.findById(restaurantId).get();
		restaurant.addManager(manager);
		manager.setRestaurant(restaurant);
		managerDao.createManager(manager);
		restRep.save(restaurant);
	}
	
	public int getIdByKey(String apiKey)
	{
		return restRep.getIdByKey(apiKey);
	}
}