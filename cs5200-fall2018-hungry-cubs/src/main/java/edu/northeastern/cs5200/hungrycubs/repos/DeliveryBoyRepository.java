package edu.northeastern.cs5200.hungrycubs.repos;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import edu.northeastern.cs5200.hungrycubs.models.DeliveryBoy;

public interface DeliveryBoyRepository extends CrudRepository<DeliveryBoy, Integer> {

	@Query("SELECT count(1) FROM DeliveryBoy WHERE status='AVAILABLE'")
	public int getAvailableCount();
	
	@Query("SELECT deliveryBoy FROM DeliveryBoy deliveryBoy WHERE status='AVAILABLE'")
	public List<DeliveryBoy> getDeliveryBoy();
}
