package edu.northeastern.cs5200.hungrycubs.controllers;

import edu.northeastern.cs5200.hungrycubs.daos.AssignmentDao;
import edu.northeastern.cs5200.hungrycubs.daos.CustomerDao;
import edu.northeastern.cs5200.hungrycubs.daos.DeliveryBoyDao;
import edu.northeastern.cs5200.hungrycubs.daos.ManagerDao;
import edu.northeastern.cs5200.hungrycubs.daos.OwnerDao;
import edu.northeastern.cs5200.hungrycubs.daos.RestaurantDao;
import edu.northeastern.cs5200.hungrycubs.daos.UserDao;
import edu.northeastern.cs5200.hungrycubs.models.Customer;
import edu.northeastern.cs5200.hungrycubs.models.DeliveryBoy;
import edu.northeastern.cs5200.hungrycubs.models.Manager;
import edu.northeastern.cs5200.hungrycubs.models.Owner;
import edu.northeastern.cs5200.hungrycubs.models.User;

import org.springframework.beans.factory.annotation.Autowired;
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
	
    private List<User> users = new ArrayList<>();
    
    
    @RequestMapping(value="/api/user")
    public User getCurrentUser(HttpSession session)
    {
    	return (User) session.getAttribute("currentUser");
    }

    @RequestMapping(value = "/api/user/register", headers = "Accept=application/json")
    public User register(@RequestBody User user, HttpSession session) {

        // TODO : Gautam add Db code
    	
    	
    	if(user.getdType().equals("MGR"))
    	{
    		Manager mgr = new Manager();
    		mgr.setId(user.getId()); mgr.setFirstName(user.getFirstName()); mgr.setLastName(user.getLastName());
    		mgr.setUsername(user.getUsername()); mgr.setPassword(user.getPassword()); mgr.setRestaurantKey(user.getRestaurantKey());
    		
    		managerDao.createManager(mgr);
    		restDao.attachManagerToRestaurant(mgr, restDao.getIdByKey(user.getRestaurantKey()));
    	}
    	
    	if(user.getdType().equals("OWR"))
    	{
    		Owner owner = new Owner();
    		owner.setId(user.getId()); owner.setFirstName(user.getFirstName()); owner.setLastName(user.getLastName());
    		owner.setUsername(user.getUsername()); owner.setPassword(user.getPassword());
    		owner.setStatus("APPROVAL_PENDING"); owner.setRestaurantKey(user.getRestaurantKey());
    		owner.setdType("OWR");
    		
    		ownerDao.createOwner(owner);
    		assignmentDao.assignOwnerToRestaurant(owner, restDao.getIdByKey(user.getRestaurantKey()));
    		
    	}
    	
    	if(user.getdType().equals("DLB"))
    	{
    		DeliveryBoy db = new DeliveryBoy();
    		db.setId(user.getId()); db.setFirstName(user.getFirstName()); db.setLastName(user.getLastName());
    		db.setUsername(user.getUsername()); db.setPassword(user.getPassword());
    		db.setStatus("AVAILABLE"); 
    		db.setdType("DLB");
    		dbDao.createDeliveryBoy(db);
    	}
    	
    	if(user.getdType().equals("CR"))
    	{
    		Customer customer = new Customer();
    		customer.setId(user.getId()); customer.setFirstName(user.getFirstName()); customer.setLastName(user.getLastName());
    		customer.setUsername(user.getUsername()); customer.setPassword(user.getPassword());
    		customer.setdType("CR");
    		customerDao.createCustomer(customer);
    		user.setId(customer.getId());
    		
    	}
    	
    	
    	
    	
        session.setAttribute("currentUser", user);

        users.add(user);
        return user;
    }

    @RequestMapping(value="/api/user/login", method= RequestMethod.POST, headers = "Accept=application/json")
    public User login(	@RequestBody User credentials,
                          HttpSession session) {
        for (User user : users) {
            if( user.getUsername().equals(credentials.getUsername())
                    && user.getPassword().equals(credentials.getPassword())) {
                session.setAttribute(credentials.getUsername(), user);
                return user;
            }
        }
        return null;
    }

    @RequestMapping(value = "/api/user/logout")
    public void logout
            (HttpSession session) {
        session.invalidate();
    }
}
