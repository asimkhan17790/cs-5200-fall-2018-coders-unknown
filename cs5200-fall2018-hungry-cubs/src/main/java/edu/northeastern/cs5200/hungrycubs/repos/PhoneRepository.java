package edu.northeastern.cs5200.hungrycubs.repos;

import org.springframework.data.repository.CrudRepository;

import edu.northeastern.cs5200.hungrycubs.models.Phone;

public interface PhoneRepository extends CrudRepository<Phone, Integer> {

}
