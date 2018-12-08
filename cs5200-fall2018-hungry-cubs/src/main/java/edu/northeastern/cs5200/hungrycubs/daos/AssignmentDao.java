package edu.northeastern.cs5200.hungrycubs.daos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import edu.northeastern.cs5200.hungrycubs.models.Assignment;
import edu.northeastern.cs5200.hungrycubs.models.Owner;
import edu.northeastern.cs5200.hungrycubs.models.Restaurant;
import edu.northeastern.cs5200.hungrycubs.repos.AssignmentRepository;
import edu.northeastern.cs5200.hungrycubs.repos.OwnerRepository;
import edu.northeastern.cs5200.hungrycubs.repos.RestaurantRepository;


@Controller
public class AssignmentDao {
	
	@Autowired
	private OwnerRepository ownerRep;
	@Autowired
	private RestaurantRepository restRep;
	@Autowired
	private AssignmentRepository assignmentRep;
	
	public Boolean assignOwnerToRestaurant(Owner owner, int restaurantId)
	{
		Restaurant restaurant = restRep.findById(restaurantId).get();
		Assignment assignment = new Assignment();
		assignment.setOwner(owner);
		assignment.setRestaurant(restaurant);
		ownerRep.save(owner);
		assignmentRep.save(assignment);
		return true;
	}

}