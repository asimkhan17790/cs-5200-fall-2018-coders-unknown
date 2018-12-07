package edu.northeastern.cs5200.hungrycubs.daos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.hungrycubs.models.User;
import edu.northeastern.cs5200.hungrycubs.repos.UserRepository;

@Component
public class UserDao {
	
	@Autowired
	private UserRepository userRep;

	
	public User createUser(User user)
	{
		 return userRep.save(user);
	}

	
}
