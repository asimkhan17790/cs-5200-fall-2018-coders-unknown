package edu.northeastern.cs5200.hungrycubs.daos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import edu.northeastern.cs5200.hungrycubs.models.Customer;
import edu.northeastern.cs5200.hungrycubs.repos.CustomerRepository;

@Controller
public class CustomerDao {

	@Autowired
	CustomerRepository customerRep;
	
	public Customer createCustomer(Customer customer)
	{
		return customerRep.save(customer);
	}
}
