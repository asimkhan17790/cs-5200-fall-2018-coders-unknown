package edu.northeastern.cs5200.hungrycubs.repos;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.northeastern.cs5200.hungrycubs.models.User;

public interface UserRepository extends CrudRepository<User, Integer> {

	@Query("SELECT user FROM User user WHERE username = :username")
	public User getUserByUsername(@Param("username") String username);
	
}
