package edu.northeastern.cs5200.hungrycubs.daos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.hungrycubs.models.Manager;
import edu.northeastern.cs5200.hungrycubs.repos.ManagerRepository;

@Component
public class ManagerDao {

	@Autowired
	ManagerRepository managerRep;
	
	public Manager createManager(Manager manager)
	{
		return managerRep.save(manager);
	}
}
