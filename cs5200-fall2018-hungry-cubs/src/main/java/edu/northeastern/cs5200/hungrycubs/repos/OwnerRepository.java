package edu.northeastern.cs5200.hungrycubs.repos;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import edu.northeastern.cs5200.hungrycubs.models.Owner;

public interface OwnerRepository extends CrudRepository<Owner, Integer> {

}
