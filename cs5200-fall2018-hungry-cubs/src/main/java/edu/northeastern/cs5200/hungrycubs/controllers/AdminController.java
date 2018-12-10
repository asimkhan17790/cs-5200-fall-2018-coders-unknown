package edu.northeastern.cs5200.hungrycubs.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.northeastern.cs5200.hungrycubs.daos.UserDao;
import edu.northeastern.cs5200.hungrycubs.models.Owner;
import edu.northeastern.cs5200.hungrycubs.models.User;

@RestController
public class AdminController {
	
	
	@Autowired
	private UserDao userDao;
	
	@GetMapping("/api/admin/users")
	public List<User> getUsers()
	{
		return userDao.getUsers();
	}
	
	@GetMapping("/api/admin/approvals/pending")
	public List<Owner> getPendingOwners()
	{
		return userDao.getPendingOwners();
	}
	
}
