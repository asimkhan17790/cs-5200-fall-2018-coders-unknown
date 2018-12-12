package edu.northeastern.cs5200.hungrycubs.repos;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import edu.northeastern.cs5200.hungrycubs.models.CustomerFollowing;

public interface CustomerFollowingRepository extends CrudRepository<CustomerFollowing, Integer> {

	@Query(value="SELECT id FROM CustomerFollowing WHERE follower_id = :followerId AND following_id = :followingId")
	public int getIdByFollowerAndFollowing(@Param("followerId") int followerId,@Param("followingId") int followingId);
	
}
