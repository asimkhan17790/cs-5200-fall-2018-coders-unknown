package edu.northeastern.cs5200.hungrycubs.daos;

import java.util.List;

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

	public Boolean assignOwnerToRestaurant(Owner owner, int restaurantId) {
		Restaurant restaurant = restRep.findById(restaurantId).get();
		Assignment assignment = new Assignment();
		assignment.setOwner(owner);
		assignment.setRestaurant(restaurant);
		if (owner.getdType().equals("OWR"))
			assignment.setStatus("APPROVAL_PENDING");
		else
			assignment.setStatus("APPROVED");
		ownerRep.save(owner);
		assignmentRep.save(assignment);
		return true;
	}

	public Boolean updateAssignment(int assignmentId, String status) {
		Assignment assignment = assignmentRep.findById(assignmentId).get();
		assignment.setStatus(status);
		assignmentRep.save(assignment);
		return true;

	}

	public int findAssignmentIdByOwnerAndRestaurant(int ownerId, int restaurantId) {
		return assignmentRep.findAssignmentIdByOwnerAndRestaurant(ownerId, restaurantId);
	}

	public Boolean unassignOwnerToRestaurant(int ownerId, int restaurantId) {
		int assignmentId = assignmentRep.findAssignmentIdByOwnerAndRestaurant(ownerId, restaurantId);
		assignmentRep.deleteById(assignmentId);
		return true;
	}

	public List<Integer> getRestaurantIdForOwner(int ownerId) {
		return assignmentRep.getRestaurantIdForOwner(ownerId);
	}

}