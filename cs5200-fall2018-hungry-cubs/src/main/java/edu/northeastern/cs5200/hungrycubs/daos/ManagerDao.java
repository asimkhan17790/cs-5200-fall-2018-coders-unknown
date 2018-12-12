package edu.northeastern.cs5200.hungrycubs.daos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.hungrycubs.models.Manager;
import edu.northeastern.cs5200.hungrycubs.repos.ManagerRepository;

@Component
public class ManagerDao {

	@Autowired
	ManagerRepository managerRep;

	public Manager createManager(Manager manager) {
		return managerRep.save(manager);
	}

	public List<Integer> getRestaurantIds() {
		return managerRep.getRestaurantIds();
	}

	public int getRestaurantId(int managerId) {
		return managerRep.getRestaurantIdForManager(managerId);
	}

	public void deleteById(int id) {
		managerRep.deleteById(id);
	}

	public Manager findById(int id) {
		return managerRep.findById(id).get();
	}
}
