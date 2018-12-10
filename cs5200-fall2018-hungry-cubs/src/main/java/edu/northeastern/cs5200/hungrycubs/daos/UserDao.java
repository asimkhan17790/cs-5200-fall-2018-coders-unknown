package edu.northeastern.cs5200.hungrycubs.daos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.hungrycubs.models.Address;
import edu.northeastern.cs5200.hungrycubs.models.Customer;
import edu.northeastern.cs5200.hungrycubs.models.Order;
import edu.northeastern.cs5200.hungrycubs.models.Owner;
import edu.northeastern.cs5200.hungrycubs.models.Phone;
import edu.northeastern.cs5200.hungrycubs.models.Restaurant;
import edu.northeastern.cs5200.hungrycubs.models.User;
import edu.northeastern.cs5200.hungrycubs.repos.AddressRepository;
import edu.northeastern.cs5200.hungrycubs.repos.CustomerRepository;
import edu.northeastern.cs5200.hungrycubs.repos.ManagerRepository;
import edu.northeastern.cs5200.hungrycubs.repos.OrderRepository;
import edu.northeastern.cs5200.hungrycubs.repos.OwnerRepository;
import edu.northeastern.cs5200.hungrycubs.repos.PhoneRepository;
import edu.northeastern.cs5200.hungrycubs.repos.UserRepository;

@Component
public class UserDao {
	
	@Autowired
	private UserRepository userRep;
	@Autowired
	private ManagerRepository managerRep;
	@Autowired
	private AddressRepository addRep;
	@Autowired
	private PhoneRepository phoneRep;
	@Autowired
	private CustomerRepository custRep;
	@Autowired
	private OrderRepository orderRep;
	@Autowired
	private OwnerRepository ownerRep;

	
	public User createUser(User user)
	{
		 return userRep.save(user);
	}
	
	public List<User> getUsers()
	{
		return (List<User>) userRep.findAll();
	}
	
	public User findByUsername(String username)
	{
		return userRep.getUserByUsername(username);
	}
	
	public int getRestaurantIdForManager(int managerId)
	{
		return managerRep.getRestaurantIdForManager(managerId);
	}
	
	public User findById(int userId)
	{
		return userRep.findById(userId).get();
	}
	
	public List<User> findAll()
	{
		return (List<User>) userRep.findAll();
	}
	
	public void attachAddToUser(User user, Address address)
	{
		user.addAddress(address);
		address.setUser(user);
		addRep.save(address);
		userRep.save(user);
	}
	
	public void removeAddForUser(User user, int addressId)
	{
		user.removeAddressById(addressId);
		addRep.deleteById(addressId);
		userRep.save(user);
	}
	
	public void removePhoneForUser(User user, int phoneId)
	{
		user.removePhoneById(phoneId);
		phoneRep.deleteById(phoneId);
		userRep.save(user);
	}
	
	public void updateAddForUser(User user, Address address)
	{
		user.updateAddress(address);
		address.setUser(user);
		addRep.save(address);
		userRep.save(user);
	}
	
	public void updatePhoneForUser(User user, Phone phone)
	{
		user.updatePhone(phone);
		phone.setUser(user);
		phoneRep.save(phone);
		userRep.save(user);
	}
	
	
	public void attachPhoneToUser(User user, Phone phone)
	{
		user.addPhone(phone);
		phone.setUser(user);
		phoneRep.save(phone);
		userRep.save(user);
	}

	public void addOrderToCustomer(Order newOrder, int customerId)
	{
		Customer cust = custRep.findById(customerId).get();
		newOrder.setCustomer(cust);
		cust.addOrder(newOrder);
		orderRep.save(newOrder);
		custRep.save(cust);
	}
	
	public void addOrderToAddress(Order newOrder, int addressId)
	{
		Address add = addRep.findById(addressId).get();
		newOrder.setAddress(add);
		add.addOrder(newOrder);
		orderRep.save(newOrder);
		addRep.save(add);
	}
	
	public void addOrderToPhone(Order newOrder, int phoneId)
	{
		Phone ph = phoneRep.findById(phoneId).get();
		newOrder.setPhone(ph);
		ph.addOrder(newOrder);
		orderRep.save(newOrder);
		phoneRep.save(ph);
	}
	
	public List<Owner> getPendingOwners()
	{
		return ownerRep.getPendingOwners();
	}
	
}
