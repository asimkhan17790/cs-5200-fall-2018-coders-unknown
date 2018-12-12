package edu.northeastern.cs5200.hungrycubs.daos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import edu.northeastern.cs5200.hungrycubs.models.Owner;
import edu.northeastern.cs5200.hungrycubs.repos.OwnerRepository;

@Component
public class OwnerDao {

	@Autowired
	private OwnerRepository ownerRep;

	public Owner createOwner(Owner owner) {
		return ownerRep.save(owner);
	}

	public void deleteById(int id) {
		ownerRep.deleteById(id);
	}

	public Owner findById(int id) {
		return ownerRep.findById(id).get();
	}
}
